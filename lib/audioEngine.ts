// Web Audio API Synthesizer Engine for real audio playback
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: NodeJS.Timeout | null = null;
  private gainNode: GainNode | null = null;
  private masterVolume: number = 0.7;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  // Play an ambient synth chord progression with bass and gentle arpeggio
  public startSynthLoop(bpm = 120, key = 'Dm') {
    this.stop();
    this.init();
    if (!this.ctx || !this.gainNode) return;

    this.isPlaying = true;
    let step = 0;

    // Frequencies for chords (Dm, Bb, F, C)
    const chordProgressions: { [key: string]: number[][] } = {
      Dm: [
        [146.83, 220.00, 261.63, 349.23], // Dm9
        [116.54, 233.08, 293.66, 349.23], // Bbmaj7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [130.81, 196.00, 261.63, 329.63], // C add9
      ],
      Am: [
        [110.00, 220.00, 261.63, 329.63],
        [174.61, 261.63, 329.63, 392.00],
        [130.81, 196.00, 246.94, 329.63],
        [146.83, 220.00, 293.66, 369.99],
      ]
    };

    const chords = chordProgressions[key] || chordProgressions['Dm'];
    const stepDurationMs = (60 / bpm) * 1000;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;

      const chordIndex = Math.floor((step / 4) % chords.length);
      const currentChord = chords[chordIndex];
      const now = this.ctx.currentTime;

      // 1. Play root bass pad on beat 1
      if (step % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(currentChord[0] / 2, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);
        filter.frequency.exponentialRampToValueAtTime(140, now + 1.8);

        bassGain.gain.setValueAtTime(0.35 * this.masterVolume, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + (stepDurationMs * 3.8) / 1000);

        bassOsc.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.gainNode);

        bassOsc.start(now);
        bassOsc.stop(now + (stepDurationMs * 4) / 1000);
      }

      // 2. Play gentle melodic synth note
      const arpNote = currentChord[step % currentChord.length] * (step % 2 === 0 ? 1 : 2);
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      leadOsc.type = 'sine';
      leadOsc.frequency.setValueAtTime(arpNote, now);

      leadGain.gain.setValueAtTime(0.18 * this.masterVolume, now);
      leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      leadOsc.connect(leadGain);
      leadGain.connect(this.gainNode);

      leadOsc.start(now);
      leadOsc.stop(now + 0.65);

      // 3. Hi-hat noise click on every offbeat
      if (step % 2 === 1) {
        this.triggerPercussion(now);
      }

      step++;
      this.timer = setTimeout(playStep, stepDurationMs / 2);
    };

    playStep();
  }

  private triggerPercussion(time: number) {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08 * this.masterVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    noise.start(time);
  }

  public playChime() {
    this.init();
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.15 * this.masterVolume, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.5);
      osc.connect(gain);
      gain.connect(this.gainNode);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.5);
    });
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new SoundEngine();
