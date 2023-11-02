let itemList = [];


function sumTotal() {
  let total = calculateSumTotal();
  $("#result1").text(total);
    $("#result2").text(total);
	$("#nokResult").hide();
	$("#okResult").hide();
		
	if(total < 0){
		  $("#nokResult").show();
	}else
	{
		  $("#okResult").show();
	}
	$("#dialog-result").dialog("open");
}

function calculateSumTotal() {
  let total = 0;
  for (let item of itemList) {
    total += item.Value;
  }
    return total;
}

        function addItem() {
            let text = $("#text").val();
            let value = $("#value").val();
            itemList.push({Text: text, Value: Number(value)});
            updateTable();
        }

        function updateTable() {
            $("#itemTable tbody").empty();
            itemList.forEach((item, index) => {
				let negative = "";
				if(item.Value < 0) negative = ' class="expansesRow"';
                $("#itemTable tbody").append(`<tr`+ negative +`><td>${index + 1}</td><td>${item.Text}</td><td>${item.Value}</td></tr>`);
            });
        }
		

$(function() {
	      $("#dialog-input").dialog({
			  autoOpen: false,
			  buttons: {
				            "Aizvērt": function() {
            $(this).dialog("close");
			  }
			  }
			  });
				      $("#dialog-result").dialog({
			  autoOpen: false,
			  buttons: {
				            "Aizvērt": function() {
            $(this).dialog("close");
			  }
			  }
			  });  
			  
      $("#dialog").dialog({
        autoOpen: false,
        buttons: {
          "Pievienot": function() {
            let text = $("#text").val();
            let value = parseFloat($("#value").val());
            let type = $("input[name='type']:checked").val();

$("#value").removeClass("ui-state-error")
    if (isNaN(value)) {
  $("#dialog-input").dialog( "open" );
		$("#value").addClass("ui-state-error")
        return;
    }
	            itemList.push({ Text: text, Value: value, Type: type });
			updateTable();
            $(this).dialog("close");
          },
          "Aizvērt": function() {
            $(this).dialog("close");
          }
        }
      });

      $("#openDialog").click(function() {
		               $("#text").val("");
           $("#value").val("");
        $("#dialog").dialog("open");
      });
});

