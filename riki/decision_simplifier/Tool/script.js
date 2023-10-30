/**
 * JavaScript file for the tool page and the tool
 */


const toolForm = $("#tool-form");
const toolFormTitle = $("#tool-form-title");
const toolContinueButton = $("#tool-continue");

let formArrayCount = 0;
let toolStep;
let currentSolution;

let toolData = {};

let submittedFormData;

$(document).ready()
{
    initializeTool();
}

function initializeTool()
{
    toolStep = 0;

    loadNextToolStep();
}

function initializeForm(formTitle, formObject)
{
    toolFormTitle.text(formTitle);


    toolForm.empty();

    toolForm.jsonForm(formObject);

    if(toolStep > 1)
    {
        let problemName = "<div class='pt-3 display-5 text-center text-white' id='problem-name'>"+ toolData["problem"]["name"] +"</div>";

        $("#problem-name").remove();

        toolFormTitle.after(problemName);

        toolFormTitle.hide();
    }


    toolContinueButton.unbind();

    toolContinueButton.on("click", function(e)
    {
        loadNextToolStep();
    });
}

function showToolResults()
{
    toolFormTitle.hide();

    toolForm.empty();

    toolContinueButton.hide();

    $("#problem-name").remove();


    let toolResultsHTML =
    `
    <div class="container-fluid toolBody">
        <div class="row min-vh-100">
            <div class="toolResults">
                <div class="row p-3">
                    <h1 class="text-center">`+ toolData["problem"]["name"] +`</h1>
                    <p class="">`+ toolData["problem"]["description"] +`</p>
                </div>
                <div class="">
    `;

    // tool results should be like:
    // ---------------------------
    // ------ problem name -------
    // --- problem description ---
    // ---------------------------
    // ----- solution name -------
    // --- pros ------- cons -----
    // ----- + ---------- - ------
    // ----- + ---------- - ------
    // ---------------------------
    // ----- solution name -------
    // --- pros ------- cons -----
    // ----- + ---------- - ------
    // ----- + ---------- - ------
    // ---------------------------


    for(var x in toolData["solutions"])
    {
        toolResultsHTML +=
        `
        <div class="row container-result">
            <h4 class="p-3">Risinajums: ${toolData["solutions"][x]["name"]}</h4>
            <div class="row m-0 p-0">
                <div class="col-6 bg-success pb-3 border-start border-end border-dark border-4 plus-container">
                    <h4 class="p-2 border-bottom border-light border-3">Priekšrocības</h4>
        `;


        for(var y in toolData["solutions"][x]["advantages"])
        {
            toolResultsHTML +=
            `
            <div class="">
                <p class="pt-3">${toolData["solutions"][x]["advantages"][y]}</p>
            </div>
            `;
        }

        toolResultsHTML += `</div>`;


        toolResultsHTML +=
        `
            <div class="col-6 bg-danger pb-3 border-start border-end border-dark border-4 minus-container">
                <h4 class="p-2 border-bottom border-light border-3">Trukumi</h4>
        `;


        for(var y in toolData["solutions"][x]["disadvantages"])
        {
            toolResultsHTML +=
            `
            <div class="">
                <p class="pt-3">${toolData["solutions"][x]["disadvantages"][y]}</p>
            </div>
            `;
        }

        toolResultsHTML +=
        `
        </div>
        </div>
        </div>
        `;
    }


    toolResultsHTML += "</div>";
    toolResultsHTML += "</div>";
    toolResultsHTML += "</div>";
    toolResultsHTML += "</div>";

    toolForm.append(toolResultsHTML);

}

function loadNextToolStep()
{
    toolForm.submit();

    if(!validateToolStepFormValues(toolStep, submittedFormData))
    {
        return;
    }


    let currentStepForm;

    if(toolStep == 0)
    {
        currentStepForm = getFirstToolStepFormObject();

        toolStep++;
    }
    else if(toolStep == 1)
    {
        createNewProblem(submittedFormData["name"], submittedFormData["description"]);

        currentStepForm = getSecondToolStepFormObject();

        toolStep++;
    }
    else if(toolStep == 2)
    {
        addSolutionsToProblem(submittedFormData["solutions"]);

        toolStep++;

        currentSolution = 0;


        for(var x in toolData["solutions"])
        {
            toolData["solutions"][x]["advantages"] = [];

            toolData["solutions"][x]["disadvantages"] = [];
        }

        currentStepForm = getThirdToolStepFormObject();

        createOneFormArrayItemByDefault();
    }
    else if(toolStep == 3)
    {
        addAdvantagesToSolution(submittedFormData["advantages"]);

        if(currentSolution >= (toolData["solutions"].length - 1))
        {
            toolStep++;

            currentSolution = 0;

            currentStepForm = getFourthToolStepFormObject();

            createOneFormArrayItemByDefault();
        }
        else
        {
            currentSolution++;

            currentStepForm = getThirdToolStepFormObject();

            createOneFormArrayItemByDefault();
        }
    }
    else if(toolStep == 4)
    {
        addDisadvantagesToSolution(submittedFormData["disadvantages"]);

        if(currentSolution >= toolData["solutions"].length - 1)
        {
            showToolResults();

            return;
        }
        else
        {
            currentSolution++;

            currentStepForm = getFourthToolStepFormObject();

            createOneFormArrayItemByDefault();
        }
    }

    initializeForm("Lēmumu pieņemšanas palīgs", currentStepForm);

    formArrayCount = 0;
    if(toolStep != 2)
    {
        countFormArrayItems();
    }

    setJsonFormArrayIcons();
}


function validateToolStepFormValues(step, formValues)
{
    let validationPassed = true;

    if(step == 1)
    {
        if(!formValues["name"] || !formValues["description"])
        {
            validationPassed = false;
        }
    }
    else if(step == 2)
    {
        validationPassed = !formValues["solutions"].some((e) => e === "");
    }
    else if(step == 3)
    {
        if(!formValues["advantages"] || formValues["advantages"].some((e) => e === ""))
        {
            validationPassed = false;
        }
    }
    else if(step == 4)
    {
        if(!formValues["disadvantages"] || formValues["disadvantages"].some((e) => e === ""))
        {
            validationPassed = false;
        }
    }

    return validationPassed;
}


function createNewProblem(problemName, problemDescription)
{
    toolData["problem"] =
    {
        name: problemName,
        description: problemDescription
    };

    toolData["solutions"] = [];
}

function addSolutionsToProblem(solutions)
{
    for(var x in solutions)
    {
        toolData["solutions"][x] =
        {
            name: solutions[x]
        };
    }
}

function addAdvantagesToSolution(advantages)
{
    for(var x in advantages)
    {
        toolData["solutions"][currentSolution]["advantages"].push(advantages[x]);
    }
}

function addDisadvantagesToSolution(disadvantages)
{
    for(var x in disadvantages)
    {
        toolData["solutions"][currentSolution]["disadvantages"].push(disadvantages[x]);
    }
}

function getFirstToolStepFormObject()
{
    console.log('getFirstToolStepFormObject');

    var firstStepFormObject =
    {
        schema:
        {
            name:
            {
                type: 'string',
                title: 'Ievadiet jūsu problēmu',
                required: true
            },
            description:
            {
                type: 'string',
                title: 'Par ko ir problēma?',
                required: true
            }
        },
        form: [
        {
            key: "name",
            type: "text",
            htmlClass: 'custom-class-1' // Добавление класса 'custom-class-1' к полю "name"
        },
        {
            key: "description",
            type: "textarea",
            htmlClass: 'custom-class-2' // Добавление класса 'custom-class-2' к полю "description"
        }
        ],
        onSubmit: function (errors, values)
        {
            submittedFormData = values;
        }
    };

    return firstStepFormObject;
}

function getSecondToolStepFormObject()
{
    console.log('getSecondToolStepFormObject');

    var secondStepFormObject =
    {
        schema:
        {
            solutions:
            {
                type: 'array',
                minItems: 2,
                items:
                {
                    title: 'Problēmas risinājumi',
                    type: "string"
                }
            }
        },
        form:
        [
            {
                type: "array",
                items:
                [{
                    key: "solutions[]",
                    title: "Iespējamais risinajums - {{idx}}",
                    allowEmpty: true,
                    htmlClass: 'solution-input'
                }]
            }
        ],
        onSubmit: function (errors, values)
        {
            submittedFormData = values;
        }
    };

    return secondStepFormObject;
}

function getThirdToolStepFormObject()
{
    console.log('getThirdToolStepFormObject');

    formArrayCount = 0;

    countFormArrayItems();

    var thirdStepFormObject =
    {
        schema:
        {
            solution:
            {
                type: "string",
                title: "Risinajums",
                readonly: true
            },
            advantages:
            {
                type: 'array',
                items:
                {
                    title: 'Risinājuma priekšrocības',
                    type: "string"
                }
            }
        },
        form:
        [
            "solution",
            {
                type: "array",
                items:
                [{
                    key: "advantages[]",
                    title: "Risinājuma priekšrocība - {{idx}}",
                    allowEmpty: true,
                    htmlClass: 'advantage-input'
                }]
            }
        ],
        value:
        {
            "solution": toolData["solutions"][currentSolution]["name"]
        },
        onSubmit: function (errors, values)
        {
            submittedFormData = values;
        }
    };

    return thirdStepFormObject;
}

function getFourthToolStepFormObject()
{
    console.log('getFourthToolStepFormObject');

    var fourthStepFormObject =
    {
        schema:
        {
            solution:
            {
                type: "string",
                title: "Risinajums",
                readonly: true
            },
            disadvantages:
            {
                type: 'array',
                items:
                {
                    title: 'Risinājuma trūkumi',
                    type: "string"
                }
            }
        },
        form:
        [
            "solution",
            {
                type: "array",
                items:
                [{
                    key: "disadvantages[]",
                    title: "Risinājuma trūkums - {{idx}}",
                    allowEmpty: true,
                }]
            }
        ],
        value:
        {
            "solution": toolData["solutions"][currentSolution]["name"]
        },
        onSubmit: function (errors, values)
        {
            submittedFormData = values;
        }
    };

    return fourthStepFormObject;
}

function setJsonFormArrayIcons()
{
    console.log('work');
    $('.glyphicon').removeClass('glyphicon');
    $('.glyphicon-plus-sign').addClass('ri-add-circle-fill remixIcon');
    $('.glyphicon-plus-sign').removeClass('glyphicon-plus-sign');

    $('.glyphicon-minus-sign').addClass('ri-indeterminate-circle-fill remixIcon');
    $('.glyphicon-minus-sign').removeClass('glyphicon-minus-sign');
}

function checkMinimalSolutionCount()
{
    if(formArrayCount <= 1)
    {
        $("._jsonform-array-deletelast").addClass('disabled');
    }
    else
    {
        $("._jsonform-array-deletelast").removeClass('disabled');
    }
}

function countFormArrayItems()
{
    console.log('here');
    $("._jsonform-array-addmore").on('click', function()
    {
        formArrayCount++;
        checkMinimalSolutionCount();
        console.log(formArrayCount);
    });

    $("._jsonform-array-deletelast").on('click', function()
    {
        formArrayCount--;
        checkMinimalSolutionCount();
        console.log(formArrayCount);
    });

    $("#tool-continue").on('click', function()
    {
        formArrayCount = 0;
        checkMinimalSolutionCount();
        console.log(formArrayCount);
    });
}

function createOneFormArrayItemByDefault()
{
    $(document).ready(function ()
    {
        $("._jsonform-array-addmore").trigger('click');
    });
}
