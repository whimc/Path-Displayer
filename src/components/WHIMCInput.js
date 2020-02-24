import React from 'react';

import CustomInput from './CustomInput';
import TimeDisplayer from './TimeDisplayer';

class WHIMCInput extends React.Component {
    render() {
        return (
            <div>
                <TimeDisplayer/>
                <CustomInput symbol="@" text="Username" className="pb-2" />
                <CustomInput symbol="#" text="Start time (Unix-based)" className="pb-2" />
                <CustomInput symbol="#" text="End time (Unix-based)" className="pb-2" />
            </div>
        )
    }
}

export default WHIMCInput;