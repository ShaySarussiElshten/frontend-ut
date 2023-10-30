import React from 'react'

type WrapperComponentProps = {
    children: JSX.Element | JSX.Element[];
};
  

const NotFoundPage: React.FC<WrapperComponentProps> = ({ children }) => {
  return (
    <div className="text-white flex justify-center">
         {children}
    </div>
  )
}

export default NotFoundPage