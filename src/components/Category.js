import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import CardList from './CardList';
import './Category.css'

export default function Category(props) {

  const [movies, setMovies] = React.useState(props.list || null);
  const [books, setBooks] = React.useState(props.list || null);
  const [products, setProducts] = React.useState(props.list || null);
  const [businesses, setBusinesses] = React.useState(props.list || null);

  useEffect(() => {
    if (props.list) {
      const movies = props.list.filter(item => item.category === 'movie')
      setMovies(movies);
      const books = props.list.filter(item => item.category === 'book')
      setBooks(books);
      const products = props.list.filter(item => item.category === 'product')
      setProducts(products);
      const businesses = props.list.filter(item => item.category === 'business')
      setBusinesses(businesses);
    }
  }, [])

  return (
    <div style={{ margin: '2rem' }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item >
                <Nav.Link eventKey="first">Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Books</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Restaurants</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content >
              <Tab.Pane eventKey="first">
                <CardList list={movies} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <CardList list={books} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <CardList list={products} />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <CardList list={businesses} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}