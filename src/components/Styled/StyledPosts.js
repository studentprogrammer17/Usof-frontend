import styled from 'styled-components';

const mainDiv = styled.div`
  text-align:center;
  width:100%;
  height: 60pt;
  border: 1px solid black;
},`

const VContent_Inactive = styled.div`
  -webkit-filter: blur(1.2px);
  -moz-filter: blur(1.2px);
  -o-filter: blur(1.2px);
  -ms-filter: blur(1.2px);
  filter: blur(1.2px);
  background-color: #ccc;

  margin-left: 350px;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 35px 20px;
  border-radius: 3px;
  text-align: left;

  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);

  margin:1px;
  width:70%;
  text-align:left;
  border: 1px solid gray;
  display:inline-block;    
},`

const VContent = styled.div`
  margin-left: 350px;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 35px 20px;
  border-radius: 3px;
  text-align: left;
  position: relative;

  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);

  margin:1px;
  width:70%;
  text-align:left;
  border: 1px solid gray;
  display:inline-block;    
},`

const pageTimeLine = styled.div`

  margin: 30px auto 0 auto;
  position: relative;
  max-width: 1000px;

  margin:1px;
  width:20%;
  text-align:left;
  border: 1px solid gray;
  display:inline-block;    


&:before {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 303px;
  right: auto;
  height: 100%;
  width: 3px;
  background: #3498db;
  z-index: 0;
  
      -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
}

&:after {
  position: absolute;
  content: '';
  width: 3px;
  height: 40px;
  background: #3498db;
  background: -webkit-linear-gradient(top, #4782d3, rgba(52, 152, 219, 0));
  background: linear-gradient(to bottom, #4782d3, rgba(52, 152, 219, 0));
  top: 100%;
  left: 303px;
  
      -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
}
},`

const VTimeLineDate = styled.div`
  white-space: nowrap;
  magrin-left: 10px;
},`

const VH3 = styled.div`
  font-size: 1.5em;
  font-weight: 600;
  margin:1px;
  width:50%;
  text-align:left;
  display:inline-block;  
},`

const VContentPoint = styled.div`
  position: relative;
  display: block;
  vertical-align: top;
  margin-bottom: 30px;
},`

const postMeta = styled.div`
  padding-top: 15px;
  margin-bottom: 20px;

  &:not(:last-child) {
    margin-right: 10px;
  }
},`

const btnAddPost = styled.div`
  display: flex;
  height: 50px;
  padding: 0;
  background: #009578;
  border: none;
  outline: none;
  border-radius: 5px;
  overflow: hidden;
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #008168;
  }
  &:active {
    background: #006e58;
  }
},`

const btnAddPostText = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 24px;
  color: #fff;
  height: 100%;
},`

const btnAddPostIcon = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 24px;
  color: #fff;
  height: 100%;
  font-size: 1.5em;
  background: rgba(0, 0, 0, 0.08);
},`


export {
  mainDiv,
  VContent,
  pageTimeLine,
  VTimeLineDate,
  VH3,
  VContentPoint,
  postMeta,
  btnAddPost,
  btnAddPostIcon,
  btnAddPostText,
};