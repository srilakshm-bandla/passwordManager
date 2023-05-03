import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['red', 'yellow', 'green', 'purple', 'violet']

class App extends Component {
  state = {
    isTrue: false,
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    isShow: false,
  }

  websiteName = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({username: event.target.value})
  }

  passwordName = event => {
    this.setState({password: event.target.value})
  }

  onAddPasswordFields = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newEntry = {
      id: uuidv4(),
      website,
      username,
      password,
      classValue,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newEntry],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onSearchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(each => each.id !== id)
    const res = newList.length !== 0
    this.setState({passwordsList: newList, isTrue: res})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      searchInput,
      isShow,
    } = this.state

    const searchResult = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let {isTrue} = this.state
    if (searchResult.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    console.log(passwordsList)

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />

        <div className="up-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="up-container-image1"
            alt="password manager"
          />

          <form
            className="password-details"
            onSubmit={this.onAddPasswordFields}
          >
            <h1 className="pass-heading">Add New Password</h1>
            <div className="input-fields">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                name="website"
                onChange={this.websiteName}
                value={website}
              />
            </div>
            <div className="input-fields">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                name="username"
                onChange={this.userName}
                value={username}
              />
            </div>

            <div className="input-fields">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                name="password"
                onChange={this.passwordName}
                value={password}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="up-container-image2"
            alt="password manager"
          />
        </div>
        <div className="down-container">
          <div className="firstdiv">
            <div className="passworddiv">
              <h1 className="passwords-list-heading">Your Passwords</h1>
              <p className="passwords-count">{searchResult.length}</p>
            </div>
            <div className="searchdiv">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="form-fields-image"
                />
                <input
                  type="search"
                  name="searchInput"
                  className="search-image"
                  placeholder="Search"
                  onChange={this.onSearchPassword}
                />
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-passwords">
            <input type="checkbox" id="check" onClick={this.showPassword} />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {!isTrue && (
            <div className="empty-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-container">
              {searchResult.map(each => (
                <li className="list-item" id={each.id} key={each.id}>
                  <p className={`initial ${each.classValue}`}>
                    {each.website.slice(0, 1)}
                  </p>
                  <div className="list-con">
                    <p>{each.website}</p>
                    <p>{each.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}

                    {isShow && <p className="password-name">{each.password}</p>}
                  </div>
                  <button
                    type="button"
                    data-testid="delete"
                    className="delete-button"
                    onClick={() => this.deletePassword(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
