import React from 'react';

type Props = {
    children: React.ReactNode,
}
const Icon: React.FC<Props> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Icon;