import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

let bookList = [
	{"title": "Hunger", "author": "Roxane Gay", "pages": 320},
	{"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages": 260},
	{"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
	{"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]

//setting the default values in case some value is not provided.
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
	//{/*point 2 -- setting the default value of props, if nothing was passed in props) */}
	static defaultProps = {
		books: [
			{"title": "Tahoe Tales", "author": "Chet Whitley", "pages": 1000}
		]
	}

	//{/*point 2 -- the state attribs used for Library class components (these are like class variable) */}
	// we cannot re-name state literal here to anything else. 
	//Its like a static block in java(not exactly, it behaves as method as well like: setState etc..) 
	//for declaring and intializing all values.
	state = { 
		open: true,
		freeBookmark: false,
		hiring: true,
		data: [],
		loading: false
	}
	//{/*point 3 -- fetches the URL data in json format , then sets that in data variable  */}
	componentDidMount() {
		this.setState({loading: true})
		fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/2')
			.then(data => data.json())
			.then(data => this.setState({data, loading: false}))
	}

	componentDidUpdate() {
		console.log("The component just updated")
	}

	//{/*point 4 -- like a setter method for variable : open , the name prevState is just a name, we can re-name it as prevvvState */}
	toggleOpenClosed = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}))
	}
	//{/*point 5 -- actual tag which will be rendered as HTML code on page as UI */}
	render() {
		//{/*point 6 -- the booklist passed is kept in props , here it is set to books variable now */}
		//we cannot re-name the props part to anything else
		const { books } = this.props
		return (
			<div>
				{/*point 7 -- the check for either Hiring or not Hiring functional component to be rendered here */}
				{this.state.hiring ? <Hiring /> : <NotHiring />}
				{this.state.loading 
					? <h2>"loading..."</h2>
					: <div>
						<h3>Library Products of the Week!</h3>
						{/*point 8 -- the data variable is set when comp. loads, then using this we map all the products as below */}
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
				{/*point 9 -- the variable open check */}
				<h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
				<button onClick={this.toggleOpenClosed}>Change</button>
				{/*point 10 -- using the bookList passed as props which was stored in books above used here*/}
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

//point 11 --This lets the props know what type of value is expected to be passed on to it 
//point 11 --i.e. the props passed should be an array not an object/string/number etc…
Library.propTypes = {
	books: PropTypes.array
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	pages: PropTypes.number,
	freeBookmark: PropTypes.bool
}


//point 1 -- passing the bookList as props to the class component
//point 1 rendering the Library component.
render(
	<Library  books={bookList}/>, 
	document.getElementById('root')
)
