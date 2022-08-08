import React from 'react'
import styled from 'styled-components'
import { Triangle } from 'react-loader-spinner'

export default function Loading() {

    return (
        <StyledLoading>
            <main>
                <Triangle
                    height="150"
                    width="150"
                    color='royalblue'
                />
            </main>
        </StyledLoading>
    )
}
const StyledLoading = styled.div`
  min-height:100vh ;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`
