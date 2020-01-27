import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import CardList from './CardList';
import './Category.scss'

export default function Category(props) {

  const [movies, setMovies] = React.useState(props.list || null);
  const [books, setBooks] = React.useState(props.list || null);
  const [products, setProducts] = React.useState(props.list || null);
  const [businesses, setBusinesses] = React.useState(props.list || null);

  useEffect(() => {
    console.log(props.list)
    if (props.list) {
      setMovies(props.list[0]);
      // setBooks(props.list[1]);
      // setProducts(props.list[2]);
      // setBusinesses(props.list[3]);
    }
  }, [props.list]);

  return (
    <div style={{ margin: '2rem' }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item >
                <Nav.Link eventKey="first">Movies</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="second">Books</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Restaurants</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content >
              {/* <Tab.Pane eventKey="first"> */}
              {/* hello */}
              <CardList
                list={movies}
                onDelete={(id) => props.delete(id)} />
              {/* </Tab.Pane> */}
              {/* <Tab.Pane eventKey="second">
                <CardList
                  list={books}
                  onDelete={(id) => props.delete(id)} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <CardList
                  list={products}
                  onDelete={(id) => props.delete(id)} />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <CardList
                  list={businesses}
                  onDelete={(id) => props.delete(id)} />
              </Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}