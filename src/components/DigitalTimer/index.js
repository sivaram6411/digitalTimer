// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  onIncreaseBtn = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecreaseBtn = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartPauseBtn = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState({isTimerRunning: !isTimerRunning})
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const text = isTimerRunning ? 'Pause' : 'Start'
    const imgAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const labelTxt = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="bg-image">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-text">{labelTxt}</p>
            </div>
          </div>
          <div className="operating-container">
            <div className="start-reset-container">
              <button
                className="start-btn"
                type="button"
                onClick={this.onStartPauseBtn}
              >
                <img src={imgUrl} alt={imgAlt} className="play-image" />
                <p className="start-text">{text}</p>
              </button>
              <button
                className="start-btn"
                type="button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-image"
                />
                <p className="reset-text">Reset</p>
              </button>
            </div>
            <p className="set-text">Set Timer limit</p>
            <div className="increase-decrease-container">
              <button
                className="inc-dec-btn"
                type="button"
                onClick={this.onDecreaseBtn}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <div className="num-text">
                <p>{timerLimitInMinutes}</p>
              </div>
              <button
                className="inc-dec-btn"
                type="button"
                onClick={this.onIncreaseBtn}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
