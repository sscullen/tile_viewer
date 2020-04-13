import './../assets/css/TileListItemCompact.scss'

import React, { Component } from 'react'
import { Icon, Button, SemanticCOLORS, SemanticICONS, Label, Progress, Segment, Dropdown, ButtonGroup, Popup } from 'semantic-ui-react'
import { Job, JobStatus, TaskStatus, JobInfoObject } from '../store/job/types'
import { Tile } from '../store/tile/types'

interface AppProps {
  taskStatus: JobInfoObject
  tile: Tile
  removeTile: Function
  toggleVisibility: Function
  resubmitLastJob: Function
}

export default function TileListItemCompact(props: AppProps) {
  console.log('inside tile list item display')
  console.log(props)

  let jobProgressIcon: SemanticICONS = 'hourglass start'
  let jobProgressColor: SemanticCOLORS = 'grey'
  let downloadButtonClass = 'tileActionButton '
  let retryButtonClass = 'tileActionButton '

  console.log(props.taskStatus)
  if (props.taskStatus) {
    if (props.taskStatus.status === TaskStatus.Pending) {
      jobProgressColor = 'grey'
    } else if (props.taskStatus.status === TaskStatus.Started) {
      jobProgressIcon = 'hourglass half'
      jobProgressColor = 'black'
    } else if (props.taskStatus.status === TaskStatus.Success || props.taskStatus.status === TaskStatus.Failure) {
      jobProgressIcon = 'hourglass end'
    }

    if (props.taskStatus.status === TaskStatus.Success) {
      jobProgressColor = 'green'
    } else if (props.taskStatus.status === TaskStatus.Failure) {
      jobProgressColor = 'red'
    }

    if (props.taskStatus.status === TaskStatus.Failure) {
      downloadButtonClass += 'disabledIcon'
    }

    if (props.taskStatus.status !== TaskStatus.Failure) {
      retryButtonClass += 'disabledIcon'
    }
  }

  let toggleVisIcon: SemanticICONS
  let toggleVisColor: SemanticCOLORS

  if (props.tile.visible) {
    toggleVisIcon = 'eye'
    toggleVisColor = 'blue'
  } else {
    toggleVisIcon = 'eye slash'
    toggleVisColor = 'grey'
  }

  let tileNameClass

  let tileNameParts = props.tile.properties.name.split('_')
  let displayName

  if (props.tile.properties.platformName === 'Sentinel-2') {
    displayName = `${tileNameParts[0]}_${tileNameParts[1].slice(3)}_${tileNameParts[5].slice(1)}_${tileNameParts[2]}_${
      tileNameParts[6]
    }`
  } else {
    displayName = props.tile.properties.name
  }

  const trigger = (
      <Button 
      basic
      compact
      size="mini"
      icon='caret down'/>
  )
  
  const options = [
    {
      key: 'overflow actions',
      text: (
        
       '' 
      ),
    },
  ]

  const style = {
    padding: '0em',
    marginTop: '2px'
  }

  return (
    <div className="tileListItemCompact">
      <div className="tileListItemLeft">
        <Button.Group>
          <Button
            compact
            basic
            circular
            size="small"
            color={toggleVisColor}
            icon={toggleVisIcon}
            onClick={event => {
              console.log('Toggle Tile visibility')
              console.log(event.target)
              console.log(props.tile)
              event.stopPropagation()
              props.toggleVisibility(props.tile.id)
            }}
          />
        </Button.Group>
        <span className="sectionLabel">{displayName}</span>
      </div>
      <div className="tileListItemActions">
        {props.taskStatus ? <Icon name={jobProgressIcon} color={jobProgressColor} circular size="small" /> : ''}

        <Button.Group>
        <Popup hoverable basic
          position="bottom center"
        
              on="click"
        content={<Button.Group vertical basic>
<Button
        basic
        size="mini"
        compact
        icon="redo alternate"
        className={retryButtonClass}
        onClick={event => {
          console.log('re submit a job')
          props.resubmitLastJob(props.tile)
          // props.removeTile(props.tile)
          event.stopPropagation()
        }}
      />
 <Button
            basic
            compact
            size="mini"
            icon="download"
            className={downloadButtonClass}
            onClick={event => {
              console.log('start a zip and download operation')
              // props.removeTile(props.tile)
              event.stopPropagation()
            }}
          />
 <Button
      basic
      compact
      size="mini"
      icon="info"
      onClick={event => {
        console.log('display tile info')
        // props.removeTile(props.tile)
        event.stopPropagation()
      }}
    />
        </Button.Group>} trigger={ <Button 
      basic
      compact
      size="mini"
      icon='caret down'
      onClick={event => event.stopPropagation()}/>} 
      style={style}
      mouseLeaveDelay={750}
      />
        {/* <Dropdown trigger={trigger} icon={null} options={options} compact/> */}
          <Button
            basic
            compact
            size="mini"
            icon="times circle"
            color="red"
            onClick={event => {
              console.log('trying to remove tile, inside tile list')
              props.removeTile(props.tile.id)
              event.stopPropagation()
            }}
          />
        </Button.Group>
      </div>
    </div>
  )
}