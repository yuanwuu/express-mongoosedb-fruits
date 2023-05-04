const React = require('react')
const DefaultLayout = require('../layout/Default')

class Edit extends React.Component {
    render (){
        const fruit = this.props.fruit
        return(
            <DefaultLayout
            title="Fruits Edit Page"
            // below 2 properties are for the Nav compnent
            link="/fruits"
            text="Edit a Fruit"
            >

            <form action={`/fruits/${fruit._id}?_method=PUT`} method='POST' >
                Name: 
                <input 
                type="text" 
                name="name" 
                defaultValue={fruit.name}/>

                Color: 
                <input 
                type="text" 
                name="color" 
                defaultValue={fruit.color}/>

                Is Ready To Eat: 
                {
                fruit.readyToEat?
                    <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat" />
                }
                <input type="submit" value="Submit changes" />     

            </form>


            </DefaultLayout>
        )
    }
}

module.exports = Edit;