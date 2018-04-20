import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import './components/notFound/NotFound.css';
import NotFound from './components/notFound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const WRAPPER_STYLE = {
	margin : '30px auto',
	height : 700,
	width  : 700
};

// Functional components
const App = () => {
	return (
		<BrowserRouter>
			<div>
			<Header />

			<Switch>
				<Route path="/" component={List} exact />
			
				<Route path="/currency/:id" component={Detail} exact />

				<Route component={NotFound} />
			</Switch>
			</div>
		</BrowserRouter>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)