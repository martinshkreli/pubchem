#!/usr/bin/env python3
#from bs4 import BeautifulSoup as soup
from pubchempy import * 
import re
import requests
import os as sh
'''
Now the goal is to try to obtain data from pubchem by searching up a chemical.
The program will ask for the chemical name and then search for it as a var. 
Then, the program should return the requested information to the user in the form of simple-to-read TXT.
'''
global chemInput	# the chemical we would like information about.
global fileFormatInput	# desired output format. (default = TXT)
title = "PubChem Search Tool"
version = 0.1
chemSelectionSection = "* = ~ C H E M I C A L     S E L E C T I O N ~ = *"
formatSelectionSection = "* = ~ F O R M A T       S E L E C T I O N ~ = *"
# below is the URL. append the above variables to it when values are obtained.
searchURL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compund/name"
# This script currently assumes a Debian/Ubuntu GNU/Linux environment.
# WSL will also work if you are running Windows.
running = "This program requires a Debian or Ubuntu GNU/Linux environment - WSL will work for Windows!"
# an array of output formats that the user will be able to choose from: 
outputFormats = ["1: .XML - Handy for viewing data as a structure.", #0
		"2: .JSON - View your data in JavaScript Object Syntax.", #1
		"3: .CSV - When you need to import and export data into databases.",  #2
		"4: .TXT - The simple and vanilla way to view data.",  #3
		"5: .PNG - Visualize your data.",  #4
		"6: .SDF - File format for encoding data of chemical structures."]  #5
# functions
def sleep(seconds):
	# halt sys ops (x) seconds
	sh.system(f'sleep {seconds}')
def printDataToConsole(giveFile):
	# print the saved data to the console for easy previewing. 
	contentDisplayed = f'\n\nContents of {giveFile} displayed above.'
	_toConsole = "Printing your saved file's contents to the console..."
	print(_toConsole)
	sleep(1)
	sh.system(f'cat {giveFile}')
	sleep(3)
	print(contentDisplayed)
def pullChemData(chemicalName, outputFormat):
	# takes the information and requests it from PubChem.
	# write the information to a file for easier reading.
	def invalidOption():
		# runs if invalid selection is made.
		inval = "Sorry - you have made an invalid choice."
		options = "Would you like to return to the Main Menu or exit the program? Press '1' for Main Menu, or '2' for Exit."
		exiting = "Exiting the program - see you later!"
		print(inval)
		sleep(1)
		menuChoice = input(options)
		if (menuChoice == '1'):
			# return to the Main Menu
			back2Main = "Returning to the Main Menu..."
			print(back2Main)
			sleep(1)
			mainMenu()
		else:
			# exit the program
			print(exiting)
			sleep(1)
			exit()		
	chemData = get_synonyms(chemicalName, 'name', 'substance')
	# conditional statement for each file format we support
	if (outputFormat == '1'):
		# write file as XML [0]
		filename = "PubChemResults.xml"
		asXML = "Writing XML data to file..."
		print(asXML)
		sleep(1)
		with open(filename, 'w') as xmlData:
			xmlData.write(str(chemData))
		print("PubChem search data saved to pubchemResults.xml.")
		sleep(1)
		printDataToConsole(filename)
	elif (outputFormat == '2'):
		# write file as JSON [1]
		filename = "PubChemResults.json"
		asJSON = "Writing JSON data to file..."
		print(asJSON)
		sleep(1)
		with open(filename, 'w') as jsonData:
			jsonData.write(str(chemData))
		print(f'PubChem search data saved to {filename}.')
		sleep(1)
		printDataToConsole(filename)
	elif (outputFormat == '3'):
		# write file as CSV [2]
		filename = "PubChemResults.csv"
		asCSV = "Writing CSV data to file..."
		print(asCSV)
		sleep(1)
		with open(filename, 'w') as csvData:
			csvData.write(str(chemData))
		print(f'PubChem search results saved to {filename}.')
		sleep(1)
		printDataToConsole(filename)
	elif (outputFormat == '4'):
		# write file as TXT [3]
		filename = "PubChemResults.txt"
		asTXT = "Writing TXT data to file..."
		print(asTXT)
		sleep(1)
		with open(filename, 'w') as txtData:
			txtData.write(str(chemData))
		print(f'PubChem search results saved to {filename}.')
		sleep(1)
		printDataToConsole(filename)
	elif (outputFormat == '5'):
		# write file as PNG [4]
		filename = "PubChemResults.png"
		asPNG = "Writing PNG data to file..."
		print(asPNG)
		sleep(1)
		with open(filename, 'w') as pngData:
			pngData.write(str(chemData))
		print(f'PubChem search data saved to {filename}.')
		sleep(1)
		printDataToConsole(filename)
	elif (outputFormat == '6'):
		# write file as SDF [5]
		filename = "PubChemResults.sdf"
		asSDF = "Writing SDF data to file..."
		print(asSDF)
		sleep(1)
		with open(filename, 'w') as sdfData:
			sdfData.write(str(chemData))
		print(f'PubChem search data saved to {filename}.')
		sleep(1)
		printDataToConsole(filename)
	else:	# exit the program.
		invalidOption()
def mainMenu():
	# menu. user is asked what chemical to search for on pubchem
	# user is also asked which format they would like the result output
	chemInput = "What is the name of the chemical you would like to search for?"
	fileFormatInput = "Which file format would you like to save the data to?"
	ffOptions = "Your file format options are:\n"
	ans = "Please type your answer below by entering the digit that corresponds to your choice:\n"
	ans1 = "Please type your answer below:\n"
	print(chemSelectionSection)
	sleep(2)
	print(chemInput)
	sleep(1)
	chemInput = input(ans1)
	print(f'Your chosen search term is {chemInput}.')
	sleep(1)
	print(formatSelectionSection)
	sleep(2)
	print(fileFormatInput)
	sleep(1)
	print(ffOptions)
	sleep(1)
	# print out the array of options (outputFormats) 
	for formatOption in outputFormats:
		print(formatOption + "\n")
	sleep(1)
	fileFormatInput = input(ans)
	print("Good to go.")
	sleep(1)
	pullChemData(chemInput, fileFormatInput)
# program begins here 
print(f'{title} - {version}')
sleep(2)
mainMenu() # launch into the Main Menu function
