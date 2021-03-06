import './../assets/css/AreaOfInterestList.scss'

import React from 'react'

import { Header, Button, Popup, Grid, Icon, Item } from 'semantic-ui-react'

import { AreaOfInterest } from '../store/aoi/types'

interface AppProps {
  addAreaModal: Function
  activeTab: number
  handleTabChange: Function
  areasOfInterest: AreaOfInterest[]
  activeAoi: string
  activateAoi: Function
  removeAoi: Function
}

interface DefaultAppState {
  popoverOpen: boolean[]
}

const defaultState: DefaultAppState = {
  popoverOpen: [],
}

export default class AreaOfInterestList extends React.Component<AppProps, DefaultAppState> {
  constructor(props: any) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = defaultState
  }

  toggle = (mainIdx: number) => {
    const popoverOpen = [...this.state.popoverOpen]
    popoverOpen.map((ele, idx) => {
      if (idx !== mainIdx) {
        popoverOpen[idx] = false
      }
    })
    popoverOpen[mainIdx] = !popoverOpen[mainIdx]
    this.setState({
      popoverOpen,
    })
  }

  render() {
    return (
      <div className="areaOfInterestList">
        <div className="header">
          <div className="topRow">
            <Header size="small">Areas of Interest</Header>
            <Button
              className="addAoiButton"
              onClick={e => {
                this.props.addAreaModal()
              }}
              color="green"
              icon
              compact
            >
              <Icon name="plus" />
            </Button>
          </div>
          <div className="bottomRow">
            <Button.Group basic compact className="tabSelect">
              <Button
                id="0"
                active={this.props.activeTab === 0}
                onClick={e => {
                  this.props.handleTabChange(e)
                }}
               
              >
                <Icon disabled name="map" />
                Map
              </Button>
              <Button
                id="1"
                active={this.props.activeTab === 1}
                onClick={e => {
                  this.props.handleTabChange(e)
                }}
               
              >
                <Icon disabled name="tasks" />
                Jobs
              </Button>
              <Button
                id="2"
                active={this.props.activeTab === 2}
                onClick={e => {
                  this.props.handleTabChange(e)
                }}
               
              >
                <Icon disabled name="info circle" />
                Details
              </Button>
            </Button.Group>
          </div>
        </div>
        <ul>
          {this.props.areasOfInterest.map((ele, idx) => {
            let aoiClassName = 'aoiListItem'

            if (ele.name === this.props.activeAoi) {
              aoiClassName += ' activeAOI'
            }

            return (
              <li id={'listItem' + idx} key={ele.name}>
                <div className={aoiClassName} onClick={() => this.props.activateAoi(ele.name)}>
                  <span className="sectionLabel">{ele.name}</span>
                  <div>
                    <Popup
                      trigger={
                        <Button
                          onClick={event => {
                            console.log('trying to remove aoi, inside aoi list')

                            event.stopPropagation()
                          }}
                          icon="times circle"
                          compact
                          size="mini"
                          color="red"
                          basic
                        />
                      }
                      flowing
                      hoverable
                      on={['click']}
                      position="right center"
                    >
                      <p className="deleteWarning">Permanently delete this area of interest?</p>
                      <div className="aoiDeleteButtons">
                        <Button
                          onClick={event => {
                            console.log('trying to remove aoi, inside aoi list')
                            console.log(idx)
                            this.toggle(idx)
                            event.stopPropagation()
                            this.props.removeAoi(ele.name)
                          }}
                          negative
                        >
                          Delete
                        </Button>
                      </div>
                    </Popup>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
