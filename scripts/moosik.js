#!/usr/bin/env node
'use babel';
'use strict';

import bot from './bot';
import config from './config';
import version from './version';

import PlaySongCommand from './commands/music/play';
import SkipSongCommand from './commands/music/skip';
import MusicStatusCommand from './commands/music/status';
import ViewQueueCommand from './commands/music/queue';
import ChangeVolumeCommand from './commands/music/volume';
import PauseSongCommand from './commands/music/pause';
import ResumeSongCommand from './commands/music/resume';
import StopMusicCommand from './commands/music/stop';
import MaxLengthCommand from './commands/music/max-length';
import MaxSongsCommand from './commands/music/max-songs';
import DefaultVolumeCommand from './commands/music/default-volume';

bot.logger.info(`Moosik v${version} is starting...`);

// Create bot
export const client = bot
	.registerDefaults()
	.registerModules([
		['music', 'Music']
	])
	.registerCommands([
		PlaySongCommand,
		SkipSongCommand,
		MusicStatusCommand,
		ViewQueueCommand,
		ChangeVolumeCommand,
		PauseSongCommand,
		ResumeSongCommand,
		StopMusicCommand,
		MaxLengthCommand,
		MaxSongsCommand,
		DefaultVolumeCommand
	])
	.registerEvalObjects({
		config: config,
		version: version
	})
.createClient();

// Exit on interrupt
let interruptCount = 0;
process.on('SIGINT', async () => {
	interruptCount++;
	if(interruptCount === 1) {
		bot.logger.info('Received interrupt signal; destroying client and exiting...');
		await Promise.all([
			client.destroy()
		]).catch(err => {
			bot.logger.error(err);
		});
		process.exit(0);
	} else {
		bot.logger.info('Received another interrupt signal; immediately exiting.');
		process.exit(0);
	}
});
