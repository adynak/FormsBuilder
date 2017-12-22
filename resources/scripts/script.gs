/******************************************************************************
 * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
 * But has been simplified and cleaned up to make it more beginner friendly   *
 * All credit still goes to Martin and any issues/complaints/questions to me. *
 * https://script.google.com/macros/s/<your_script_id>/exec
 ******************************************************************************/

function sendWelcomeMail(mailData){
  var content = '';
  content += '<div>Dear ' + mailData.name_first + ',</div><br>';
  content += '<div>Thank you for joining ' + mailData.webApp + '!</div><br>';
  content += '<div>After reviewing your materials, we will add you as a registered user.  Watch for a confirmation email soon.</div><br>';
  content += '<div>In the meantime, you can log using ‘guest’ for both email and password prompts.</div><br>';
  content += '<div>Sincerely,</div><br>';
  content += '<div>' + mailData.webApp + '</div><br>';
  content += '<div>Do Not Reply to this email. This is an automatically generated email.</div><br>';
  
  MailApp.sendEmail({
      to:       String(mailData.email),
      subject:  "Welcome to " + String(mailData.webApp) + "!",
      replyTo:  "noreply@" + String(mailData.appDomain) ,
      htmlBody: content,
      noReply: true
    });  
}

function formatMailBody(obj) {
  var orderedObject= {
    'onlineid': obj.onlineid,
    'password': obj.password,
    'name_first': obj.name_first,
    'name_last': obj.name_last,
    'email': obj.email,
    'phone_main': obj.phone_main,
    'pword_type': 0,
    'member_type':0
  };
  var keycount    = Object.keys(orderedObject).length;
  var index       = 0;
  var result      = ''; 
  var columns     = '';
  var values      = '';
  var sql         = '';
  
  result += "<div>Please add me as a new " + obj.webApp + " member:<\div><br>";
  for (var key in orderedObject) {
    index ++;
    if (key.length > 0){
      result += "<strong>" + key + " - </strong>" + orderedObject[key] + "<br>";
      columns += key;
      values  += "'" + orderedObject[key] + "'";
      if (index < keycount){
        columns += ", ";
        values  += ", ";
      }
    }
  }
  sql = 'insert into yourSchema.members (' + columns + ') values (' + values + ');';
  result += "<br><div>" + sql + "<\div>";
  return result;
}

function doPost(e) {

  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    // record_data(e);

    var mailData = e.parameters;
    
    // send email TO the new member
    sendWelcomeMail(mailData);
   
    // send email to sysadmin
    MailApp.sendEmail({
      to:       String(mailData.replyTo),
      subject:  "Add to " + String(mailData.webApp) + " Members",
      replyTo:  String(mailData.email),
      htmlBody: formatMailBody(mailData)
    });

    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */
function record_data(e) {
  Logger.log(JSON.stringify(e)); // log the POST data in case we need to debug it
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName('responses'); // select the responses sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column
      if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }

}