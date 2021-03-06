import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { get } from './utils/BooksAPI'
import ShelfChanger from './ShelfChanger'

class Book extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    book: {}
  }

  componentDidMount() {
    get(this.props.book.id).then((book) => {
      this.setState({ book })
    })
  }

  render () {
    const { book } = this.state
    const { onShelfExchange } = this.props

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={
                { width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks&&book.imageLinks.thumbnail})`
                }
              }></div>
            <ShelfChanger book={book} onShelfExchange={(bool) => onShelfExchange(bool)}/>
          </div>
          <div className="book-title">{book.title} - {book.shelf}</div>
          <div className="book-authors">{book.authors&&book.authors.map(name => name)}</div>
        </div>
      </div>
    )
  }
}

export default Book
