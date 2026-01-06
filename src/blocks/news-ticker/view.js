import ABlocksMarquee from './newsTicker';

function initializeMarquee() {
	const marqueeElements = document.querySelectorAll(
		'.ablocks-block-news-ticker'
	);

	marqueeElements.forEach( ( element ) => {
		const slideSpeed =
			parseFloat( element.getAttribute( 'data-slide-speed' ) ) || 1;
		const slideDirection =
			element.getAttribute( 'data-slide-direction' ) || 'left';
		const isPauseOnOver =
			element.getAttribute( 'data-pause-on-hover' ) === 'true';
		const navigatorColor =
			element.getAttribute( 'data-navigator-color' ) || '#13191B';
		const marqueeInstance = new ABlocksMarquee( element, {
			slideSpeed,
			slideDirection,
			isPauseOnOver,
		} );

		const pauseButton = element.querySelector(
			'.ablocks-block-news-ticker--icons__pause'
		);
		let isPaused = false;

		if ( pauseButton ) {
			pauseButton.innerHTML = `
               <svg class="ablocks-block-news-ticker--icons__pause" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="9" y="4" width="1.55556" height="19.25" fill="${ navigatorColor }" />
					<rect x="18.2" y="4" width="1.55556" height="19.25" fill="${ navigatorColor }" />
				</svg>`;

			pauseButton.addEventListener( 'click', () => {
				if ( isPaused ) {
					marqueeInstance.resumeAnimation();
					pauseButton.innerHTML = `

                    <svg class="ablocks-block-news-ticker--icons__resume" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="9" y="4" width="1.55556" height="19.25" fill="${ navigatorColor }" />
							<rect x="18.2" y="4" width="1.55556" height="19.25" fill="${ navigatorColor }" />
						</svg>

                    `;
				} else {
					marqueeInstance.pauseAnimation();
					pauseButton.innerHTML = `
                     <svg class="ablocks-block-news-ticker--icons__pause" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4347 12.7449L8.10069 4.58794C7.87588 4.45028 7.6184 4.37513 7.35484 4.37025C7.09128 4.36537 6.8312 4.43093 6.60145 4.56018C6.37389 4.68741 6.18432 4.87296 6.05225 5.09775C5.92017 5.32253 5.85036 5.57844 5.84998 5.83916V22.1513C5.85169 22.5424 6.00863 22.9168 6.2863 23.1922C6.56396 23.4676 6.93963 23.6215 7.33071 23.62C7.60367 23.6199 7.87134 23.5446 8.10439 23.4025L21.4347 15.2455C21.649 15.1149 21.826 14.9314 21.9489 14.7126C22.0718 14.4938 22.1363 14.2471 22.1363 13.9961C22.1363 13.7452 22.0718 13.4985 21.9489 13.2797C21.826 13.0609 21.649 12.8774 21.4347 12.7468V12.7449ZM7.33071 22.1337V5.85119L20.6416 13.9952L7.33071 22.1337Z" fill="${ navigatorColor }"/>
                    </svg>`;
				}
				isPaused = ! isPaused;
			} );
		}
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeMarquee();
} );
