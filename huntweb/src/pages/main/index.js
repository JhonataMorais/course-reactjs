import React, { Component } from 'react';
import api from '../../services/api';
import styles from './styles.css';

export default class Main extends Component {
	state = {
		products: [],
		productInfo: {},
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = async (page = 1) => {
		const res = await api.get(`/products?page=${page}`);
		
		const { docs, ...productInfo } = res.data;

		this.setState({
			products: res.data.docs,
			productInfo
		})
	}

	prevPage = () => {

	}

	nextPage = () => {
		const { page, productInfo } = this.state;

		if (page === productInfo.pages) return;

		const pageNumber = page + 1;

		this.loadProducts(pageNumber)
	}

    render() {
        return (
        	<div className="product-list">
        		{
        			this.state.products.map(product => (
        				<article key={product._id} >
        					<strong>{product.title}</strong>
        					<p>{product.description}</p>

        					<a href="">Acessar</a>
        				</article>
        			))
        		}
        		<div className="actions">
        			<button onClick={this.prevPage}>Anterior</button>
        			<button onClick={this.nextPage}>Próximo</button>
        		</div>
        	</div>
        )
    }
}