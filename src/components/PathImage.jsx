import React from 'react';

import Alert from 'react-bootstrap/Alert';
import { GetWorldFromImageName } from '../helpers';


const PathImage = ({ title, link }) => (
	<Alert variant="primary">
		<Alert.Heading>{GetWorldFromImageName(title)}</Alert.Heading>
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
		>
			<img width='100%' src={link} alt={title} />
		</a>
	</Alert>
);

export default PathImage;
