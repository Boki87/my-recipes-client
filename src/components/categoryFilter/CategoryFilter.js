import styled from 'styled-components'
import {categories} from '../../utils'


const StyledCatBtn = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0px 10px;
    background: ${({theme}) => theme.primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        height: 50px;
    }
`

const CategoryBtn = ({title, icon}) => {

    return (
        <StyledCatBtn>
            <img src={icon} alt=""/>
        </StyledCatBtn>
    )
}


const StyledCategoryFilterWrapper = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const StyledH = styled.div`    
    display: flex;
    justify-content: center;
    margin-top: 20px;    
    margin-bottom: 10px;
`

const CategoryFilter = () => {
    return (
        <>
            <StyledH>Filter by category</StyledH>
            <StyledCategoryFilterWrapper>
                
                {categories.map(cat => 
                    <CategoryBtn title={cat.title} icon={cat.icon} key={`iconBtn${cat.title.split(" ").join('_')}`}/>
                )}
            </StyledCategoryFilterWrapper>
        </>
    )
}

export default CategoryFilter
