/** @param {NS} ns **/
export async function main(ns) {
	const gangName = "Slum Snakes"
	const crime = "Homicide";

	ns.disableLog("sleep");
	ns.tail();

	while (!ns.gang.inGang()) {
		let factionList = ns.checkFactionInvitations();
		let karma = ns.heart.break();
		ns.print("Current Karma : " + karma);
		if (karma > -55000) {
			ns.commitCrime(crime);
			await ns.sleep(3000);
			for (let faction of factionList) {
				if (faction == gangName) {
					ns.joinFaction(faction);
					ns.toast("Joined Slum Snakes", "success", 3000)
				}
				else {
					ns.print("Slum Snakes is not available")
				}
			}
		}
		else if ((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) >= 32) {
			ns.gang.createGang(gangName);
			ns.toast("Created Gang", "success", 3000)
			ns.exec("gang-CK.js", "home");
			await ns.sleep(100);
		}
		else {
			ns.print("Not enough available RAM");
			await ns.sleep(100);
		}
	}
}