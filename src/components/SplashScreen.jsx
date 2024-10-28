import Image from 'next/image';

const SplashScreen = () => {
  const hasIntro = true;
  const hasLoader = true;

  return (
    <div className="game">
      {/* Loader */}
      {hasLoader && (
        <div className="game_loader">
          <div className="game_loader__inner">
            <div className="logo">
              <Image
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mineLogo.gif"
                alt="Logo"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
              />
            </div>
            <div className="subtitle">
              <h1>A no JS Adventure game</h1>
            </div>
            <div className="bar">
              <div className="bar_inner"></div>
            </div>
            <span>Loading checkboxes...</span>
          </div>
        </div>
      )}

      {/* Intro */}
      {hasIntro && (
        <div className="game_intro">
          <input
            id="intro-1"
            className="dialogue"
            type="radio"
            name="intro"
            defaultChecked
          />
          <div className="dialogue">
            Ahhhhhhh!!
            <label htmlFor="intro-2">
              <Image
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowMovement.png"
                alt="Arrow"
                width={30} // Set appropriate width
                height={30} // Set appropriate height
              />
            </label>
          </div>

          <input id="intro-2" className="dialogue" type="radio" name="intro" />
          <div className="dialogue">
            The floor just collapsed under me
            <label htmlFor="intro-3">
              <Image
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowMovement.png"
                alt="Arrow"
                width={30} // Set appropriate width
                height={30} // Set appropriate height
              />
            </label>
          </div>

          <input id="intro-3" className="dialogue" type="radio" name="intro" />
          <div className="dialogue">
            Geez it sure is dark in here
            <label htmlFor="intro-4">
              <Image
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowMovement.png"
                alt="Arrow"
                width={30} // Set appropriate width
                height={30} // Set appropriate height
              />
            </label>
          </div>

          <input id="intro-4" className="dialogue" type="radio" name="intro" />
          <div className="dialogue">
            Let me light my torch...
            <label htmlFor="intro-5">
              <Image
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowMovement.png"
                alt="Arrow"
                width={30} // Set appropriate width
                height={30} // Set appropriate height
              />
            </label>
          </div>

          <input id="intro-5" className="dialogue" type="radio" name="intro" />
          <div className="dialogue end">
            Better. Need to find a way out.
          </div>
          
          <input id="intro-6" className="dialogue" type="radio" name="intro" />
          <div className="overlay"></div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
