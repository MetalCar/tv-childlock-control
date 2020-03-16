# tv-childlock-control

This little tool is for my son. I found out, that he silently go away from his bed in the middle of the night to watch tv.
So I decided to write a little tool that will turn the tv off when a configured contingent is achieved.
Additionally I want to specify times when the tv can be turned on. For us parents,
i will add a webadministration, where we can disable the childlock, that we are able to watch tv without contingent.

In my imagination I will install this tool on an Raspberry Pie and check if I got some wifi-signal in my basement. If it is, I will place Raspy there, otherwise I have to search for an other place. Important is, that my son can't find the Raspy, otherwise he will perhaps turn off this tv childlock

I'm using this model, I don't know if that works on other devices:
* Samsung UE40F6500

## Usage
This project has two npm commands that are needed to run:
* `TV_IP=xxx.xxx.xxx.xxx npm run start:server` to start the server with the specified IP. Otherwise, you can manually enter the IP in the files.
* `npm run start:client` to start the client
