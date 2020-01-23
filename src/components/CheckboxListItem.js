import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

export default function CheckBoxListItem(props) {
  const [thumbnail, setThumbnail] = React.useState()

  useEffect(() => {
    if (props.listItem.category === 'books') {
      if (props.listItem.image.thumbnail) {
        setThumbnail(props.listItem.image.thumbnail);
        props.listItem.image = props.listItem.image.thumbnail;
      } else {
        setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/1920px-16777216colors.png')
        props.listItem.image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/1920px-16777216colors.png';
      }
    } else {
      setThumbnail(props.listItem.image);
    }
  }, [])
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