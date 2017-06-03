export const types = {
	team: 'team',
	player:'player',
	match:'match',
	event: 'event',
	user: 'user',
	tournament:'tournament',
	auth:'auth',
}

export const actions = {};

export const pluralNames = {
	[types.user] : "users",
	[types.tournament] : "tournaments",
	[types.event] : "events",
	[types.match] : "matches",
	[types.team] : "teams",
};

export function pluralNamesArray(){
	const ret  = [];
	for(let key in pluralNames){
		ret.push(pluralNames[key]);
	}
	return ret;
}
