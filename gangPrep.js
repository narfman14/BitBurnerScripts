/** @param {NS} ns **/
export async function main(ns) {
	const gangName = "Slum Snakes"
	const crime = "Homicide";
	ns.disableLog("sleep");
	ns.tail();
	
	while (!ns.gang.inGang()) {
		ns.clearLog();
		let factionList = ns.checkFactionInvitations();
		let karma = ns.heart.break();
		ns.print("Current Karma : " + karma);
		//Build Karma
		if (karma > -55000) {
			for (let faction of factionList) {
				if (faction == gangName) {
					ns.joinFaction(faction);
				}
				else {
					ns.commitCrime(crime);
					await ns.sleep(3000);
				}
			}
		}
		else if ((ns.getServerMaxRam("home")-ns.getServerUsedRam("home")) >= 32){
			ns.gang.createGang(gangName);
			ns.exec("gang-CK.js","home");
		}
		else{ns.print("Not enough available RAM");}
	}
}