import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Nav, Navbar, Form, Row, Col } from "react-bootstrap";
import { FaCloudRain, FaFire, FaWater, FaFeather, FaSnowflake } from "react-icons/fa";
import rainSound from "./assets/rain.mp3";
import fireSound from "./assets/fire.mp3";
import wavesSound from "./assets/waves.mp3";
import birdsSound from "./assets/birds.mp3";
import whiteNoiseSound from "./assets/white-noise.mp3";
import slothVideo from "./assets/sloth.webm";
import "./MeditationZone.css";
import RainEffect from "./RainEffect";

const MeditationZone = () => {
  const [rainAudioInstance] = useState(new Audio(rainSound));
  const [fireAudioInstance] = useState(new Audio(fireSound));
  const [wavesAudioInstance] = useState(new Audio(wavesSound));
  const [birdsAudioInstance] = useState(new Audio(birdsSound));
  const [whiteNoiseAudioInstance] = useState(new Audio(whiteNoiseSound));
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(null);
    const [activeSounds, setActiveSounds] = useState({ rain: false, fire: false, waves: false, birds: false, whiteNoise: false });

  useEffect(() => {
    let interval;
    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(null);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const toggleAudio = (audioInstance, type) => {
    if (audioInstance.paused) {
      audioInstance.play();
      setActiveSounds({ ...activeSounds, [type]: true });
    } else {
      audioInstance.pause();
      setActiveSounds({ ...activeSounds, [type]: false });
    }
  };

  const setVolume = (audioInstance, value) => {
    audioInstance.volume = Math.min(Math.max(value, 0), 1);
  };

  const startTimer = () => {
    if (timer > 0) {
      setCountdown(timer * 60);
    }
  };

  const stopTimer = () => {
    setCountdown(null);
  };

  return (
    <Container className="text-center mt-5">
      <RainEffect enabled={activeSounds.rain} /> {/* Ensures rain stays in background */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 p-3 rounded">
        <Navbar.Brand>Meditation Zone</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Guides</Nav.Link>
        </Nav>
      </Navbar>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow p-4 bg-dark text-white h-100">
            <h2>Ambient Sounds</h2>
            <Row className="mb-3">
              <Col>
                <Button
                  className={`sound-btn ${activeSounds.rain ? "active" : ""}`}
                  onClick={() => toggleAudio(rainAudioInstance, "rain")}
                >
                  <FaCloudRain /> Rain
                </Button>
              </Col>
              <Col>
                <Form.Range min="0" max="1" step="0.01" onChange={(e) => setVolume(rainAudioInstance, parseFloat(e.target.value))} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button
                  className={`sound-btn ${activeSounds.fire ? "active" : ""}`}
                  onClick={() => toggleAudio(fireAudioInstance, "fire")}
                >
                  <FaFire /> Fire
                </Button>
              </Col>
              <Col>
                <Form.Range min="0" max="1" step="0.01" onChange={(e) => setVolume(fireAudioInstance, parseFloat(e.target.value))} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button
                  className={`sound-btn ${activeSounds.waves ? "active" : ""}`}
                  onClick={() => toggleAudio(wavesAudioInstance, "waves")}
                >
                  <FaWater /> Waves
                </Button>
              </Col>
              <Col>
                <Form.Range min="0" max="1" step="0.01" onChange={(e) => setVolume(wavesAudioInstance, parseFloat(e.target.value))} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button
                  className={`sound-btn ${activeSounds.birds ? "active" : ""}`}
                  onClick={() => toggleAudio(birdsAudioInstance, "birds")}
                >
                  <FaFeather /> Birds
                </Button>
              </Col>
              <Col>
                <Form.Range min="0" max="1" step="0.01" onChange={(e) => setVolume(birdsAudioInstance, parseFloat(e.target.value))} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className={`sound-btn ${activeSounds.whiteNoise ? "active" : ""}`}
                  onClick={() => toggleAudio(whiteNoiseAudioInstance, "whiteNoise")}
                >
                  <FaSnowflake /> White Noise
                </Button>
              </Col>
              <Col>
                <Form.Range min="0" max="1" step="0.01" onChange={(e) => setVolume(whiteNoiseAudioInstance, parseFloat(e.target.value))} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow p-4 bg-dark text-white h-100">
            <h2>Breathing Exercise</h2>
            {countdown === null ? (
              <>
                <Form.Control type="number" placeholder="Set timer (minutes)" onChange={(e) => setTimer(e.target.value)} />
                <Button variant="success" className="mt-2" onClick={startTimer}>Start Timer</Button>
              </>
            ) : (
              <>
                <h3>{Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}</h3>
                <Button variant="danger" className="mt-2" onClick={stopTimer}>Stop</Button>
              </>
            )}
          <div className="sloth-video-container">
            <video autoPlay loop muted className="sloth-video">
            <source src={slothVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          </Card>
        </Col>
      </Row>

      <Card className="shadow p-4 bg-dark text-white mt-4">
        <h2>Daily Affirmation</h2>
        <p>"You are enough, just as you are. Keep moving forward with confidence and peace."</p>
      </Card>
      {activeSounds.waves && (
    <div className="ocean">
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
    )}
    </Container>
  );
};

export default MeditationZone;
