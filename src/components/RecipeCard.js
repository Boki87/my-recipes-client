import styled from 'styled-components'
import {Link} from 'react-router-dom'

import ClockIcon from '../assets/icons/clock.svg'
import PlateIcon from '../assets/icons/plate.svg'

const StyledRecipeCard = styled.div`
    width: 220px;
    height: 250px;
    margin: 10px; 
    background: ${(props) => props.theme.bgPrimary};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .recipe_image {
        height: 120px;
        width: 100%;
        overflow: hidden;
        img {
            width: 100%;
            object-fit: cover;
        }
        display:flex;
        align-items: center;
        justify-content: center;
        background: ${({theme}) => theme.bgSecondary};
        color: ${({theme}) => theme.textSecondary};
    }


    .recipe_body {
        position: relative;
        flex: 1;
        width: 100%;

        .open_btn {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: ${({theme}) => theme.primaryColor};
            color: ${({theme}) => theme.bgPrimary};
            position: absolute;
            right: 10px;
            top: -17px;            
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .material-icons {
                font-size: 1.1rem;
            }
        }


        .name {
            padding: 0px 10px;
            font-size: 0.9rem;     
            width: 150px;       
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .category {
            padding: 0px 10px;
            font-size: 0.8rem;
            color: ${({theme}) => theme.textSecondary};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .info {
            width:100%;
            display: flex;
            height: 40px;       
            padding: 0px 10px;
            .info_item {
                display: flex;
                align-items:center;
                margin-right: 20px;
                font-size: 0.8rem;      
                color: ${({theme}) => theme.textSecondary};
                img {
                    height: 20px;
                    margin-right:7px;
                }
            }
            
        }

        .rating {
            display:flex;
            align-items: center;
            padding: 0px 10px;
            .material-icons {
                color: ${({theme}) => theme.secondaryColor};
            }
        }
    }
`

const RecipeCard = ({
    recipe,
    style = {}
}) => {

    const {
        category,
        photo,
        name,
        preparationTime,
        numberOfServings

    } = recipe

    return (
        <StyledRecipeCard style={style}>
            <div className='recipe_image'>
                {photo && photo != 'no-photo.jpg' ?
                    <img src={`${process.env.REACT_APP_API}/uploads/${photo}`} alt=""/> :
                    <div>
                        No Image Available
                    </div>
                }
            </div>
            <div className='recipe_body'>

                <Link to={`/recipe/${recipe._id}`} className='open_btn'>
                    <span className="material-icons">
                        launch
                    </span>
                </Link>


                <div className='name'>{name}</div>
                <div className='category'>{category.name}</div>

                <div className='info'>
                    <div className='info_item'>
                        <img src={ClockIcon} alt=""/>
                        {preparationTime} min
                    </div>
                    <div className='info_item'>
                        <img src={PlateIcon} alt=""/>
                        {numberOfServings}
                    </div>
                </div>
                <div className='rating'>
                    <span className="material-icons">
                        star
                    </span>
                    <span className="material-icons">
                        star
                    </span>
                    <span className="material-icons">
                        star
                    </span>
                    <span className="material-icons">
                        star
                    </span>
                    <span className="material-icons">
                        star
                    </span>
                </div>
            </div>
        </StyledRecipeCard>
    )
}

export default RecipeCard
