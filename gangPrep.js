/** @param {NS} ns **/
export async function main(ns) {
	const gangName = "Slum Snakes"
	const crime = "Homicide";

	ns.disableLog("sleep");
	ns.disableLog("singularity.joinFaction")
	ns.tail();

	while (!ns.gang.inGang()) {
		//let factionList = ns.singularity.checkFactionInvitations();
		let karma = ns.heart.break();
		ns.print("Current Karma : " + karma);
		if (karma > -55000) {
			let joinGang = ns.singularity.joinFaction(gangName);
			ns.singularity.commitCrime(crime);
			if (joinGang) {
				ns.toast("Joined Slum Snakes", "success", 5000)
				await ns.sleep(100)
			}
			await ns.sleep(3000);
		}
		else if ((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) >= 32) {
			ns.gang.createGang(gangName);
			ns.toast("Created Gang", "success", 5000)
			ns.exec("gang-CK.js", "home");
			await ns.sleep(100);
		}
		else {
			ns.print("Not enough available RAM");
			await ns.sleep(100);
		}
	}
}