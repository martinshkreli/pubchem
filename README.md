# ChemSearch  

A small Python script that allows you to search for chemicals on PubChem and save it in a file format of your choice to local disk.

### Usage

**1.** First, clone this repo to your local machine: 

`git clone https://github.com/martinshkreli/pubchem`

**2.** Next, change directories to the new *pubchem* directory, make the installation script executable and run it:

```sh
cd pubchem
chmod +x deps_installer.sh
./deps_installer.sh
```

**3.** Once the dependencies have installed successfully on your machine, you can invoke the *pchem.py* script with Python: 

`python3 pchem.py`

Go through the process presented, and the information you request in the script will be saved to your local disk. You'll be prompted to choose a chemical and a file format, and relevant information will be saved in that file format, as well as displayed on the console automatically for your convenience.
