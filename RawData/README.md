# Getting raw data from the invoice PDF files
The raw data for this project is sourced from the online shopping invoices provided by the supermarket. This way there is no argument over data ownership, nor any need for special permission to access or reuse the data. While a connection to a public API supplied by the supermarkets would be preferable as a data source, the method used here is by far easier to obtain, even though it is more labour-intensive.

## Step 1: Preparing the folder structure
I keep my raw data files for this project in the **`~/grocery-reworking/`** folder on my local machine. The local git clone of this project is at **`~/git/grocery-reworking`** on my local machine. Note that the actual raw data files are kept out of the git repository entirely, for now.
```
~/grocery-reworking/RawData/pdf/
~/grocery-reworking/RawData/pdf/DONE/
~/grocery-reworking/RawData/txt/
~/grocery-reworking/RawData/txt/DONE/

~/git/grocery-reworking/
~/git/grocery-reworking/Code.gs
~/git/grocery-reworking/README.md
~/git/grocery-reworking/RawData/
~/git/grocery-reworking/RawData/README.md (this file)
~/git/grocery-reworking/SpreadsheetApp/   
```
## Step 2: Downloading the historic invoice PDF files
Each PDF file attachment should be downloaded individually from the emails sent by the supermarket when the transaction is completed. They should be named using the following format: **`yymmdd_nnnnnnnnnn.pdf`** where the `nnnnnnnnnn` is the invoice number. An example filename is `201215_4105566076.pdf`. Each one should be downloaded to the `~/grocery-reworking/RawData/pdf/` folder on the local machine.

## Step 3: Extracting text from the PDF files
For this step we will use the **`pdftotext`** command to extract the text from each PDF file, and save that text out as new text files in the **`~/grocery-reworking/RawData/txt/`** folder on the local machine.
```sh=
# cd ~/grocery-reworking/RawData/pdf/
# for file in *.pdf; do pdftotext "$file"; done
# mv *.txt ../txt/
```
