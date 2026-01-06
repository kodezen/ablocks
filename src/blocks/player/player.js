class ABlocksPlayer {
	constructor( element ) {
		this.element = element;
		this.youtube = element.querySelector( '#youtube' );
		this.selfHostedVideo = element.querySelector( '#selfHostedVideo' );
		this.audio = element.querySelector( '#audio' );
		this.vimeo = element.querySelector( '#vimeo' );

		if ( this.youtube ) {
			const autoplay =
				this.youtube.getAttribute( 'data-autoplay' ) === 'true';
			const muted = this.youtube.getAttribute( 'data-mute' ) === 'true';
			const loop = this.youtube.getAttribute( 'data-loop' ) === 'true';

			const shouldMute = autoplay ? true : muted;
			this.originalMuteState = muted;

			this.mainPlayer = new Plyr( this.youtube, {
				autoplay,
				muted: shouldMute,
				loop: { active: loop },
			} );
			this.configureYouTube();
		} else if ( this.selfHostedVideo ) {
			this.mainPlayer = new Plyr( this.selfHostedVideo );
		} else if ( this.vimeo ) {
			const autoplay =
				this.vimeo.getAttribute( 'data-autoplay' ) === 'true';
			const muted = this.vimeo.getAttribute( 'data-mute' ) === 'true';
			const loop = this.vimeo.getAttribute( 'data-loop' ) === 'true';
			const shouldMute = autoplay ? true : muted;
			this.originalMuteState = muted;

			this.mainPlayer = new Plyr( this.vimeo, {
				autoplay,
				muted: shouldMute,
				loop: { active: loop },
			} );
		} else if ( this.audio ) {
			this.mainPlayer = new Plyr( this.audio );
		}

		if ( this.mainPlayer ) {
			const wrapper = element.querySelector( '.plyr' );
			if ( wrapper ) {
				this.insertPlayButton( wrapper );
			}

			this.mainPlayer.on( 'playing', () => {
				this.hidePlayButton();
				if ( ! this.originalMuteState && this.mainPlayer.muted ) {
					this.mainPlayer.muted = false;
				}
			} );
			this.mainPlayer.on( 'pause', () => this.showPlayButton() );
			this.mainPlayer.on( 'ended', () => this.showPlayButton() );
			this.mainPlayer.on( 'ready', () => {
				const controls =
					this.element.querySelectorAll( '.plyr__control' );
				controls.forEach( ( control ) => {
					control.addEventListener( 'click', () => {
						if (
							! this.originalMuteState &&
							this.mainPlayer.muted
						) {
							this.mainPlayer.muted = false;
						}
					} );
				} );
			} );
		}
	}

	configureYouTube() {
		this.videoStartTime = this.parseTime(
			this.youtube.getAttribute( 'data-video-start-time' )
		);
		this.videoEndTime = this.parseTime(
			this.youtube.getAttribute( 'data-video-end-time' )
		);

		this.mainPlayer.on( 'ready', () => {
			if ( ! isNaN( this.videoStartTime ) ) {
				this.mainPlayer.currentTime = this.videoStartTime;
			}
		} );

		this.mainPlayer.on( 'timeupdate', () => {
			if (
				! isNaN( this.videoEndTime ) &&
				this.mainPlayer.currentTime >= this.videoEndTime
			) {
				this.mainPlayer.pause();
			}
		} );
	}

	insertPlayButton( wrapper ) {
		const btn = document.createElement( 'div' );
		btn.className = 'ablocks-play-pause-button';
		wrapper.appendChild( btn );
		this.playButton = btn;

		btn.addEventListener( 'click', () => {
			if ( ! this.originalMuteState && this.mainPlayer.muted ) {
				this.mainPlayer.muted = false;
			}
			this.mainPlayer.togglePlay();
		} );
	}
	hidePlayButton() {
		this.playButton?.classList.add( 'is-hidden' );
	}
	showPlayButton() {
		this.playButton?.classList.remove( 'is-hidden' );
	}

	parseTime( str ) {
		if ( ! str ) {
			return NaN;
		}
		return str
			.split( ':' )
			.reverse()
			.reduce( ( s, p, i ) => s + parseFloat( p ) * 60 ** i, 0 );
	}

	destroy() {
		this.mainPlayer?.destroy();
	}
}

export default ABlocksPlayer;
