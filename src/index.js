import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

let bookList = [
	{"title": "Hunger", "author": "Roxane Gay", "pages": 320},
	{"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
	{"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
	{"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]


const Book = ({title="Title Not Provided", author= "Author Not Provided", pages="unknown", freeBookmark}) => {
	return (
		<section>
			<h2>{title}</h2>
			<p>by: {author}</p>
			<p>Pages: {pages} pages</p>
			<p>Free Bookmark Today: {freeBookmark ? 'yes!': 'no!'}</p>
		</section>
	)
}

const Hiring = () => 
	<div>
		<p>The library is hiring. Go to www.library.com/jobs for more.</p>
	</div>

const NotHiring = () => 
	<div>
		<p>The library is not hiring. Check back later for more info.</p>
	</div>

class Library extends React.Component {
	
	static defaultProps = {
		books: [
			{"title": "Tahoe Tales", "author": "Chet Whitley", "pages": 1000}
		]
	}
	
	state = { 
		open: true,
		freeBookmark: false,
		hiring: true,
		data: [],
		loading: false
	}

	componentDidMount() {
		this.setState({loading: true})
		fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/2')
			.then(data => data.json())
			.then(data => this.setState({data, loading: false}))
	}

	componentDidUpdate() {
		console.log("The component just updated")
	}


	toggleOpenClosed = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}))
	}

	render() {
		const { books } = this.props
		return (
			<div>
			
				{this.state.hiring ? <Hiring /> : <NotHiring />}
				{this.state.loading 
					? <h2>"loading..."</h2>
					: <div>
						<h3>Library Products of the Week!</h3>
			
						{this.state.data.map(product => {
							return (
								<div key={product.id}>									
									<h4>{product.name}</h4>
									<img alt={product.name} src={product.image} height={100}/>
								</div>
							)
						})}
						
					</div>
				}
			
				<h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
				<button onClick={this.toggleOpenClosed}>Change</button>
			
				{books.map(
					(book, i) => 
						<Book 
							key={i}
							title={book.title} 
							author={book.author} 
							pages={book.pages}
							freeBookmark={this.state.freeBookmark}/>
				)}
			</div>
		)
	}
}


Library.propTypes = {
	books: PropTypes.array
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	pages: PropTypes.number,
	freeBookmark: PropTypes.bool
}

render(
	<Library  books={bookList}/>, 
	document.getElementById('root')
)
