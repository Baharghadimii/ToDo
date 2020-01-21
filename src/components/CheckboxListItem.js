import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

export default function CheckBoxListItem(props) {
  const [thumbnail, setThumbnail] = React.useState()

  useEffect(() => {
    if (props.listItem.category === 'book') {
      if (props.listItem.img.thumbnail) {
        setThumbnail(props.listItem.img.thumbnail);
      } else {
        setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/1920px-16777216colors.png')
      }
    } else {
      setThumbnail(props.listItem.img);
    }
  })
  return (
    <Form onChange={props.onChange}>
      <div style={{ display: 'flex', flexDirection: "row" }} className="mb-3">
        <Form.Check
          type={'checkbox'}
          id={props.listItem.id}
        />
        <Image style={{ width: '2rem', height: '2rem', marginLeft: '0.5rem' }} src={thumbnail} roundedCircle />
        <p style={{ fontSize: '15px', marginLeft: '0.5rem' }}>{props.listItem.title}</p>
      </div>
    </Form>
  )
}