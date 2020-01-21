import React from 'react';
import CheckboxListItem from './CheckboxListItem';
import Table from 'react-bootstrap/Table';

export default function CheckboxList(props) {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Movies</th>
          <th>Books</th>
          <th>Products</th>
          <th>Reastaurants</th>
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