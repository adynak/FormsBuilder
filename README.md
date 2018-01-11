
## Forms Builder

This is a single page application that can be used to identify input fields on a PDF form.  Load a scanned form as a PDF into this app and mark the locations of input fields.  You can also specify the field width and the alignment of the input field.

* Preview your layout definitions in an editable grid.
* Review your work using the WSYIWIG viewer.
* Save your work to finish later.
* The layout saves in JSON format for uploading to the server.

## Getting Started

You have a few things to get in place before using this app in your environment

### Prerequisites

Load these software packages:

```
node and npm
```

```
php
```

```
apache or IIS
```

### Installing

Clone the repo to a folder under your web server and use npm to install it.

```
npm install
```

## Running The App For The First Time

Using your browser, open **index.php** in the path where you installed the project. 
### Settings

The first time you run the app, you will be prompted to set up the configuration of your PC.  Measure the screen to the nearest 1/16".  The app can convert pixels into the units of your choice: MM, Inches, FBU (FormsBuilderUnits).  

The tricky part is choosing the Zoom value to display the PDF.  Begin with 100, choose a PDF form and click Build Form.  Hold the form against your monitor.  You will need to choose a Zoom that makes the monitor the same size as the form.

## Building Forms

### Build Forms

Choose **Build Form** and navigate to the form you want to build.  Using the mouse, create a print position at the top-left of the form.  Setting the alignment and width of any field is optional.  Name this field zero-zero.  This field is a reference point for measurements to the other form fields. 
 
Continue adding fields.

If you need to scroll down in the document, be sure that you *scroll the page*, not the PDF.  If you see spots moving when you scroll, you are scrolling the PDF.

When you are done adding print positions, ***Right Click*** the PDF and choose

 - Save Changes - you like where your spot landed
 - Discard Changes - ALL new spots will be discarded
 - Reset All Fields - ALL spots will be discarded

Pixels are small.  If you get close to your intended position, that is good enough.  You can move these with **Display Form Definition**.

### Display Form Definition

Use this option to remove fields you don't want or to nudge the ones you want.  The distance in MM or Inches displays in parenthesis based on your **Settings**.

Re-position fields by changing the pixel value of horizontal or vertical


### Upload Form

Use this option to preview the form you just build.  When you click **SAVE** the form is saved on your system in this folder: ***resources/wip*** with the same name as the PDF you selected but with a ***.wip*** extension.

## Make it Yours
Look in **i18n/en_us** for branding and language used for screen text.

## Authors

* **Al Dynak** - *Initial work* 

See also the list of [contributors](https://github.com/adynak/searchForms/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/adynak/searchForms/blob/master/LICENSE) file for details

