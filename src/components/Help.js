function Help(){
  return(
    <div>    
    <div className="body">
        <div className="container body1" style={{height:"100%"}}>
            <br/><br/><br/>
            <div className="row">  
            <h3 style={{ margin:"10% 0 5% 0", color:"white", fontSize: "45px"}}>FAQ's</h3>  
            <div class="container">
                <div class="panel-group" id="faqAccordion">
                    <div class="panel panel-default ">
                        <div class="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                            <h4 class="panel-title">
                                <a href="#" class="ing">Q: What's an NFT?</a>
                        </h4>

                        </div>
                        <div id="question0" class="panel-collapse collapse">
                            <div class="panel-body">
                                <h5><span class="label label-primary">Answer</span></h5>

                                <p className="p1_help">
                                    An NFT stands for "Non-fungible token" and is a fancy way of saying it's a unique, one of a kind digital item that users can buy, own, and trade. Some NFTs main function are to be digital art and look cool, some offer additional utility like exclusive access to websites or participation in an event, think of it like a rare piece of art that can also act as a "members" card.

                                </p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="panel panel-default ">
                        <div class="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                            <h4 class="panel-title">
                                <a href="#" class="ing">Q: Why do we use it?</a>
                        </h4>

                        </div>
                        <div id="question1" class="panel-collapse collapse">
                            <div class="panel-body">
                                <h5><span class="label label-primary">Answer</span></h5>
                                    <p className="p1_help">
                                        You can generate fungible, non-fungible tokens, and private sale without the code. 
                                    </p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="panel panel-default ">
                        <div class="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question2">
                            <h4 class="panel-title">
                                <a href="#" class="ing">Q: What is private sale?</a>
                        </h4>

                        </div>
                        <div id="question2" class="panel-collapse collapse" >
                            <div class="panel-body">
                                <h5><span class="label label-primary">Answer</span></h5>

                                <p className="p1_help">
                                    Private Sale is fundraising for every new token fungible tokens. We are only support AVAX Network.
                                </p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="panel panel-default ">
                        <div class="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question3">
                            <h4 class="panel-title">
                                <a href="#" class="ing">Q: Why we need credits?</a>
                        </h4>

                        </div>
                        <div id="question3" class="panel-collapse collapse" >
                            <div class="panel-body">
                                <h5><span class="label label-primary">Answer</span></h5>

                                <p className="p1_help">
                                    You can buy Credits then You do not need to pay gas fee.
                                </p>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>
            </div>
        </div></div></div>


    <style>{`
    .label{
        color:white;
    }
    
    `}</style>


    </div>
  )
}
export default Help;
