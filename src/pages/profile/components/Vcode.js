import React, { Component } from 'react'

import './Vcode.css'

import FormItem from "antd/es/form/FormItem";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Input from "antd/es/input/Input";

class VCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.initState(),
            refresh: false
        };

    }

    // componentDidMount(){
    //     this.props.onRef(this)
    // }


    initState(){
        return {
            data: this.getRandom(109,48,4),//返回一个数据列表
            rotate: this.getRandom(75,-75,4),
            fz: this.getRandom(15,40,4),
            color: [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
        }
    };

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random()*(max-min+1)+min)
        if(!Boolean(num)){
            return asciiNum
        }
        const arr = []
        for(let i = 0; i < num; i++){
            arr.push(this.getRandom(max, min))
        }
        return arr
    }
    ;
    canvas() {
        const { getRandom } = this
        const canvas = document.getElementById('bgi')
        let ctx = canvas.getContext('2d')
        canvas.height = canvas.height
        // ctx.clearRect(0, 0, canvas.width(), canvas.height())
        ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`
        for( let i = 0; i< 7; i++ ) {
            ctx.lineTo(getRandom(200,0),getRandom(200,10))
            ctx.moveTo(getRandom(200,0),getRandom(200,0))
            ctx.stroke();
        }
    };
    componentDidMount() {
        this.canvas();
        this.props.onRef(this);
    };

    //检验验证码是否正确
    handleVcodeBlur=(value)=>{
        // const value=this.props.vcode;
        var vcode=this.state.data.map((v)=>String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 )));
        var vcode2=`${vcode[0]}${vcode[1]}${vcode[2]}${vcode[3]}`;//提取字符串列表中的纯字符并拼接为串
        const newvcode=vcode2.toLowerCase();
        console.log('inputvcode',value)
        console.log('newvcode:',newvcode);
        if (value && value !== newvcode) {
            return "no";
        }
        else if(value==''){
            return "empty";

        }else{
            return "yes";
        }

    };

    render() {

        // const {onCheck,form} = this.props;
        // const { getFieldDecorator } = form;
        const { rotate, fz, color } = this.state
        //const { getFieldDecorator } = this.form;
        return (
            <div className='vcodewrap' >
                <canvas id="bgi" width="200" height="200"></canvas>
                {this.state.data.map((v,i) =>
                    <div
                        key={i}
                        className='itemStr'
                        style={{
                            transform:`rotate(${rotate[i]}deg)`,
                            fontSize: `${fz[i]}px`,
                            color: `rgb(${color[i].toString()})`
                        }}
                        onMouseEnter={() => this.setState({refresh:true})}
                    >
                        {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
                    </div>
                )}
                {
                    this.state.refresh
                        ? <div
                            className='mask'
                            onClick={() => {
                                this.setState({...this.initState(),refresh: false})
                                this.canvas()
                            }}
                            onMouseLeave={() => {this.setState({refresh: false})}}
                        > 看不清？点击刷新
                        </div>
                        : null}
            </div>



        )
    }
}

export default VCode;