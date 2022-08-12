#!/bin/bash
#
# installs the dependencies for the ChemSearch python program.
debLocation="/etc/lsb-release"
distro_notice="Debian/Ubuntu GNU/Linux environment detected. Continuing..."
deps="python3 python3-pip" 
pubchem="pubchempy" 
err="This script currently expects a Debian/Ubuntu GNU/Linux distro to work."
err2="If you're on Windows, WSL can also be used!"
install_err="Sorry, dependencies not installed successfully."
install_err2="Sorry, pip3 was not able to successfully install $pubchem." 
check_distro() {
	# this function checks to make sure that we are on a Debian/Ubuntu environment
	echo "Checking distribution compatibility..."
	if [ -f $debLocation ]; then 
		echo $distro_notice
		install_deps # run the deps installer function
	else
		echo $err
		sleep 1
		echo $err2
		echo "Exiting..."
		exit 1 # exit out of the installer
	fi
}
install_deps() {
	# install the needed dependencies.
	echo "Installing dependencies for ChemSearch..."
	sudo apt update && sudo apt -y install $deps || echo $install_err && exit 1
	pip install $pubchem || echo $install_err2 && exit 1
	echo "Everything correctly installed." 
}
echo "ChemSearch Dependencies Installation Script" 
sleep 1
echo "Beginning required operations..."
check_distro
echo "Everything finished. You can now run 'python3 pchem.py' to invoke ChemSearch. Enjoy!"
sleep 2
exit 0
