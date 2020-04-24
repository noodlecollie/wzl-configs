dCore Linux Setup
=================

This is a reference of useful steps I've discovered while setting up dCore Linux on an HP Pavilion tx 1000 laptop.

## Booting

Use the command `dc root=sr0 laptop` to boot up the system. If the `root=sr0` argument is not present, a kernel panic will occur.

## Network

Currently, the tx 1000 appears to be having issues with its wireless card. I got internet access by cabling the laptop into my other laptop which was on WiFi, and then sharing the connection.

To share WiFi over Ethernet, right-click on the WiFi adapter in the Windows Network Adapters settings area, go to the Sharing tab and enable sharing. This will set an automatic IP address on the Ethernet adapter (which for me was 192.168.137.1).

On the other computer, set a static IP (eg. 192.168.137.5), make sure the network mask is the same (eg. 255.255.255.0), and set the gateway to the IP address of the computer whose internet connection you will be using. Under NameServers, specify an IP address to be used for DNS lookup (Google's DNS server IP is 8.8.8.8).

Some useful networking commands are:

* `arp -a`: Lists the known IP addresses on the network, from the current machine's point of view.
* `ping 172.217.3.110`: Pings Google.com by IP, in case DNS resolution is not yet set up. This can be used to check whether or not internet access currently exists.

## Installing Software

dCore Linux contains utilities to use existing Debian/Ubuntu packages within the system. For full information, see https://www.linuxsecrets.com/tinycorelinux-wiki/dcore:faq.html#how_do_i_install_additional_software.

Installing software is a two-step process:

1. Use `sce-import` to search for packages to import. This requires an internet connection. https://www.linuxsecrets.com/tinycorelinux-wiki/dcore:sce-import_command.html contains more information about how to use the command.
2. After installation, `sce-load` is required in order to make the new application available for use. This loads the relevant applications into RAM. https://www.linuxsecrets.com/tinycorelinux-wiki/dcore:sce-load_command.html contains more information about how to use the command; note that `/etc/sysconfig/tcedir/sceboot.lst` can be used to load applications on boot.

Additionally, "on-demand" applications can be configured, although I'm not yet sure about the details of these. For more information, see https://www.linuxsecrets.com/tinycorelinux-wiki/dcore:sce-ondemand_command.html.
