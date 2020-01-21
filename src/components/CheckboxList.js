import React, { useEffect } from 'react';
import CheckboxListItem from './CheckboxListItem';
import Table from 'react-bootstrap/Table';

export default function CheckboxList(props) {


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.list.rowOne.map(item => {
            if (item.category === 'movie') {
              return <th>Movies</th>
            } else if (item.category === 'book') {
              return <th>Books</th>
            } else if (item.category === 'product') {
              return <th>Products</th>
            } else if (item.category === 'business') {
              return <th>Reastaurants</th>
            }
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.list.rowOne.map(item => {
            return (
              <td><CheckboxListItem listItem={item} onChange={() => props.onChange(item.id)} /></td>
            )
          })}
        </tr>
        <tr>
          {props.list.rowTwo.map(item => {
            return (
              <td><CheckboxListItem listItem={item} onChange={() => props.onChange(item.id)} /></td>
            )
          })}
        </tr>
        <tr>
          {props.list.rowThree.map(item => {
            return (
              <td><CheckboxListItem listItem={item} onChange={() => props.onChange(item.id)} /></td>
            )
          })}
        </tr>
        <tr>
          {props.list.rowFour.map(item => {
            return (
              <td><CheckboxListItem listItem={item} onChange={() => props.onChange(item.id)} /></td>
            )
          })}
        </tr>
      </tbody>
    </Table>

  )
}