var startDate = "";
var endDate = "";
var from_date = "";
var to_date = "";
const CategoryPricePieChart = document.getElementById('CategoryPricePieChart');
dataInOption = [];
labels = [];
const chartInstance = new Chart(CategoryPricePieChart, {
    type: 'pie',
    data: [],
    options: {
        legend: {
            position: 'right',
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, dataInOption) {
                    var label = dataInOption.labels[tooltipItem.index];
                    var value = dataInOption.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var total = dataInOption.datasets[tooltipItem.datasetIndex].data.reduce((acc, curr) => acc + curr, 0);
                    var percentage = ((parseFloat(value) / parseFloat(total)) * 100).toFixed(2);
                    var parsedNumber = parseFloat(value);
                    var formattedNumber = parsedNumber.toLocaleString('en-IN');
                    return label + ': ₹ ' + formattedNumber + ' (' + percentage + '%)';
                }
            }
        }
    }
});
const filteredDataChart = document.getElementById('filteredDataChart');
var hiddenPart = [];
var original_Values = [];
const filteredDataChartData = new Chart(filteredDataChart, {
    type: 'doughnut',
    data: {},
    options: {
        legend: {
            labels: {
                generateLabels: function (chart) {
                    debugger;
                    var data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                        return data.labels.map(function (label, i) {
                            var dataset = data.datasets[0];
                            var value = dataset.data[i];

                            var legendItem = {
                                text: label, // Display label and value
                                fillStyle: dataset.backgroundColor[i], // You can customize the color
                            };

                            if (value == 0) {
                                legendItem.hidden = true;
                                legendItem.textDecoration = 'line-through';
                                legendItem.index = i;
                            }
                            else {
                                legendItem.hidden = false;
                                legendItem.index = i;
                            }
                            return legendItem;
                        });
                    } else {
                        return [];
                    }
                }
            },
            position: 'right',
            onClick: function (e, legendItem) {
                debugger;
                function toggleLegendItemVisibility(legendItemIndex) {

                    var datasetIndex = 0;
                    var dataIndexToHide = legendItemIndex;
                    var dataOfHiddenPart = 0;
                    var remainingSum = 0
                    var meta = filteredDataChartData.getDatasetMeta(0);
                    var currentLegendItem = meta.data[legendItemIndex];
                    var totalAmountDiv = document.getElementById('show_total_amount');
                    var totalFilteredAmountDiv = document.getElementById('show_total_filtered_amount');
                    if (hiddenPart[dataIndexToHide] == true) {
                        dataInFilteredChart.data[dataIndexToHide] = original_Values[dataIndexToHide];
                        hiddenPart[dataIndexToHide] = false;
                        dataOfHiddenPart = Number(original_Values[dataIndexToHide]);
                        remainingSum = dataOfHiddenPart;
                    } else {
                        hiddenPart[dataIndexToHide] = true;
                        original_Values[dataIndexToHide] = dataInFilteredChart.data[dataIndexToHide];
                        dataInFilteredChart.data[dataIndexToHide] = 0;
                        dataOfHiddenPart = remainingSum;
                        remainingSum = 0;
                    }
                    var sumOfVisibleParts = 0;
                    for (var j = 0; j < dataInFilteredChart.data.length; j++) {
                        if (!hiddenPart[j]) {
                            sumOfVisibleParts += Number(dataInFilteredChart.data[j]) || 0;
                        }

                    }
                    totalFilteredAmountDiv.innerHTML = '';
                    var formattedTotalAmount_Filtered = sumOfVisibleParts.toLocaleString('en-IN');
                    var formattedTotalAmount = sumOfVisibleParts.toLocaleString('en-IN');
                    totalAmountDiv.innerHTML = '';
                    totalFilteredAmountDiv.innerHTML = '₹ ' + formattedTotalAmount_Filtered;
                    totalAmountDiv.innerHTML = '₹ ' + formattedTotalAmount;
                    currentLegendItem.hidden = !currentLegendItem.hidden; // Toggle visibility
                    currentLegendItem["_model"].textDecoration = currentLegendItem.hidden ? 'line-through' : ''; // Apply line-through style
                    if (sumOfVisibleParts == 0) {
                        totalAmountDiv.innerHTML = '';
                        totalFilteredAmountDiv.innerHTML = '';
                    }
                    filteredDataChartData.update();
                }
                toggleLegendItemVisibility(legendItem.index);

            }

        },
        cutout: '70%',
        plugins: {
            legend: {

            }
        },
        animation: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    debugger;
                    var label = data.labels[tooltipItem.index];
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var total = TotalAmount;
                    var parsedValue = parseFloat(value);
                    var parsedTotal = parseFloat(total);
                    var percentage = ((parsedValue / parsedTotal) * 100).toFixed(2);
                    var formattedNumber = parsedValue.toLocaleString('en-IN');
                    return label + ': ₹ ' + formattedNumber + ' (' + percentage + '%)';
                }
            }
        },
        onClick: function (event, elements) {
            debugger;
            if (elements.length > 0) {
                var clickedLabel = dataList.labels[elements[0]._index];
                if (clickedLabel == 'Open' || clickedLabel == 'On-Hold') {
                    showCategoryPriceByStatus(clickedLabel);
                }
            }
        }
    }
});
function showCategoryPriceByStatus(StatusType) {
    var formdata = new FormData();
    formdata.append("FromDate", from_date);
    formdata.append("ToDate", to_date);
    formdata.append("StatusType", StatusType);
    console.log(formdata);
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'Dashboard/ViewCategoryPriceByStatus',
        data: formdata,
        processData: false,
        contentType: false,
		success: function (return_Data) {
			debugger;
			if (return_Data != null)
            {
                if (return_Data.ColdLeadsAmount == 0 && return_Data.WarmLeadsAmount == 0 && return_Data.HotLeadsAmount == 0) {
                    $('#data_not_found').css('display', 'block');
                    $('#myPieChart').css('display', 'none');
                    $('#show_total_amount').css('display', 'none');
                    $('#show_total_filtered_amount').css('display', 'none');
                    $('#CategoryPricePieChart').css('display', 'none');
                    $('#filteredDataChart').css('display', 'none');
                    $('#showPreviousData').css('display', 'block');
                }
                else {
                    $('#datePicker').prop('disabled', true);
                    $('#filteredDataChart').css('display', 'none');
                    document.getElementById('clearable__clear').removeAttribute('onclick');
                    $('#category-price-details').text(StatusType + ' leads');
                    ClearPriceOfStatusChart();
                    $('#category-price-details').css('display', 'block');
                    $('#showPreviousData').css('display', 'block');
                    $('#myPieChart').css('display', 'none');
                    $('#show_total_amount').css('display', 'none');
                    $('#show_total_filtered_amount').css('display', 'none');
                    $('#data_not_found').css('display', 'none');
                    $('#clearable__clear').css('display', 'none');
                    $('#CategoryPricePieChart').css('display', 'block');
                    var data_List = {};
                    if (StatusType == 'Open') {
                        labels = [
                            'Cold',
                            'Warm',
                            'Hot'
                        ];
                        data_List = {
                            data: [return_Data.ColdLeadsAmount, return_Data.WarmLeadsAmount, return_Data.HotLeadsAmount],
                            backgroundColor: [
                                '#0D5ABC',
                                '#EE6638',
                                '#C00E30'
                            ],
                            hoverBackgroundColor: [
                                '#0D5ABC',
                                '#EE6638',
                                '#C00E30'
                            ]
                        };
                    }
                    else if (StatusType == 'On-Hold') {
                        labels = [
                            'Cold',
                            'Warm',
                            'Ghost'
                        ];
                        data_List = {
                            data: [return_Data.ColdLeadsAmount, return_Data.WarmLeadsAmount, return_Data.GhostLeadsAmount],
                            backgroundColor: [
                                '#0D5ABC',
                                '#EE6638',
                                '#D63683'
                            ],
                            hoverBackgroundColor: [
                                '#0D5ABC',
                                '#EE6638',
                                '#D63683'
                            ]
                        };
                    }
                    
                    chartInstance.data.labels = [];
                    chartInstance.data.datasets.forEach((dataset) => {
                        dataset.data = [];
                    });
                    chartInstance.update();
                    chartInstance.data.labels = labels;
                    chartInstance.data.datasets = [data_List];
                    dataInOption = [data_List];
                    chartInstance.update();
                }
                
			}
		}
	});
}
function ClearPriceOfStatusChart(){
    chartInstance.data.labels = [];
    chartInstance.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chartInstance.update();
}
function showPreviousData() {
    debugger;
    $('#clearable__clear').attr('onclick', 'clearDatesFromCalendar();');
    $('#datePicker').prop('disabled', false);
    $('#CategoryPricePieChart').css('display', 'none');
    $('#showPreviousData').css('display', 'none');
    $('#category-price-details').css('display', 'none');
    $('#data_not_found').css('display', 'none');
    $('#clearable__clear').css('display', 'block');
    if (from_date == "" && to_date == "") {
        $('#filteredDataChart').css('display', 'none');
        $('#myPieChart').css('display', 'block');
        $('#show_total_amount').css('display', 'block');
        $('#show_total_filtered_amount').css('display', 'none');
        $('#calendar-icon').css('display', 'block');
        $('#clearable__clear').css('display', 'none')
    }
    else {
        $('#filteredDataChart').css('display', 'block');
        $('#myPieChart').css('display', 'none');
        $('#show_total_amount').css('display', 'none');
        $('#show_total_filtered_amount').css('display', 'block');
        $('#clearable__clear').css('display', 'block')
        $('#calendar-icon').css('display', 'none');
    }
}
function updateMinDate() {
    var fromDateInput = document.getElementById('TxtFromDate');
    var toDateInput = document.getElementById('TxtToDate');
    toDateInput.min = fromDateInput.value;
}
function showRefreshIcon() {
    $('#clearDates').css('display', 'inline-block');
    $('#clearDates').css('color', 'black');
}
function clearData() {
    $('#datePicker').val('');
}

var selectedDates = [];
function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

flatpickr("#datePicker", {
    mode: "range",
    maxDate:"today",
    dateFormat: "d/m/Y",
    onOpen: function (selectedDates, dateStr, instance) {
        const calendarContainer = instance.calendarContainer;
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'show_custom-button';
        const buttonContainerId = $('#show_custom-button');
        if (!buttonContainerId.hasClass('custom-button-container')) {
            buttonContainer.classList.add('custom-button-container');
            const customButton = document.createElement('button');
            customButton.classList.add('button');
            customButton.classList.add('custom-button');
            customButton.id = 'show_records';
            customButton.textContent = 'Show Records';
            customButton.disabled = true;
            buttonContainer.appendChild(customButton);
            calendarContainer.appendChild(buttonContainer);
        }
    },
    onChange: function (selectedDates, dateStr, instance) {
        debugger;
        from_date = convert(selectedDates[0]);
        sessionStorage.setItem('from_date', from_date);
        if (selectedDates.length != 0) {
            $('#clearable__clear').css('display', 'block');
            $('#calendar-icon').css('display', 'none');
        }
        else {
            $('#clearable__clear').css('display', 'none');
            $('#calendar-icon').css('display', 'block');
        }
        if (selectedDates.length === 2) {
            startDate = selectedDates[0];
            endDate = selectedDates[1];
            to_date = convert(selectedDates[1]);
            sessionStorage.setItem('to_date', to_date);
            var customButton = document.getElementById('show_records');
            customButton.disabled = false;
            $('#show_records').text(formatDateDifference(selectedDates[0], selectedDates[1]));
            $('.flatpickr-calendar').addClass('open');
            $('#show_records').attr('onclick', 'showpricebydate(' + "'" + from_date + "'" + ',' + "'" + to_date + "'" + ');');
        }
        instance.open();
    }
});
$('#datePicker').on('click', function () {
    debugger;
    if (!$('.flatpickr-calendar').hasClass('open')) {
        $('.flatpickr-calendar').addClass('open');
    }
});
function showpricebydate(startDate,endDate){
    debugger;
    if (startDate != "" && endDate != "") {
        if (startDate == endDate) {
            var customButton = document.getElementById('show_records');
            customButton.disabled = true;
            return;
        }
    }
    var formdata = new FormData();
    formdata.append("FromDate", startDate);
    formdata.append("ToDate", endDate);
    $.ajax({
        type: "POST",
        url: ServerURL + '/Dashboard/GetLeadsPriceByDates',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (return_Data) {
            debugger;
            if (return_Data.PriceOfClosedLeads == 0 && return_Data.PriceOfConvertedLeads == 0 && return_Data.PriceOfHoldLeads == 0 && return_Data.PriceOfHoldLeads == 0 && return_Data.PriceOfOpenLeads == 0) {
                $('#data_not_found').css('display', 'block');
                $('#myPieChart').css('display', 'none');
                $('#show_total_amount').css('display', 'none');
                $('#show_total_filtered_amount').css('display', 'none');
                $('#CategoryPricePieChart').css('display', 'none');
                $('#filteredDataChart').css('display', 'none');
                $('.flatpickr-calendar').removeClass('open');
            }
            else {
                sessionStorage.setItem('TotalPriceOfOpenLeads', Number(return_Data.PriceOfOpenLeads));
                sessionStorage.setItem('TotalPriceOfClosedLeads', Number(return_Data.PriceOfClosedLeads));
                sessionStorage.setItem('TotalPriceOfHoldLeads', Number(return_Data.PriceOfHoldLeads));
                sessionStorage.setItem('TotalPriceOfConvertedLeads', Number(return_Data.PriceOfConvertedLeads));
                $('#data_not_found').css('display', 'none');
                $('#myPieChart').css('display', 'none');
                $('#show_total_amount').css('display', 'none');
                $('#show_total_filtered_amount').css('display', 'block');
                $('#filteredDataChart').css('display', 'block');
                $('#CategoryPricePieChart').css('display', 'none');
                $('.flatpickr-calendar').removeClass('open');
                $('#TotalLeads').text(return_Data.TotalLeads);
                $('#ClosedLeads').text(return_Data.ClosedLeadsCount);
                $('#GhostLeads').text(return_Data.GhostLeadsCount);
                $('#ConvertedLeads').text(return_Data.ConvertedLeadsCount);
                $('#OnHold').text(return_Data.HoldLeadsCount);
                $('#OpenLeads').text(return_Data.OpenLeadsCount);
                var TotalAmount = Number(return_Data.PriceOfOpenLeads) + Number(return_Data.PriceOfClosedLeads) + Number(return_Data.PriceOfHoldLeads) + Number(return_Data.PriceOfConvertedLeads);
                var total_Amount_Div = document.getElementById("show_total_filtered_amount");
                var formattedTotalAmount = TotalAmount.toLocaleString('en-IN');
                total_Amount_Div.innerHTML = '₹ ' + formattedTotalAmount;
                var labelsInFilteredChart = [
                    'Open',
                    'Closed',
                    'On-Hold',
                    'Converted'
                ];
                var dataList = {};
                dataInFilteredChart = {
                    data: [sessionStorage.getItem('TotalPriceOfOpenLeads'), sessionStorage.getItem('TotalPriceOfClosedLeads'), sessionStorage.getItem('TotalPriceOfHoldLeads'), sessionStorage.getItem('TotalPriceOfConvertedLeads')],
                    backgroundColor: [
                        '#47B0F8',
                        '#A694F8',
                        '#F9C747',
                        '#F1843B'
                    ],
                    hoverBackgroundColor: [
                        '#47B0F8',
                        '#A694F8',
                        '#F9C747',
                        '#F1843B'
                    ]
                };
                filteredDataChartData.data.labels = [];
                filteredDataChartData.data.datasets.forEach((dataset) => {
                    dataset.data = [];
                });
                filteredDataChartData.update();
                filteredDataChartData.data.labels = labelsInFilteredChart;
                filteredDataChartData.data.datasets = [dataInFilteredChart];
                dataInOption = [dataInFilteredChart];
                filteredDataChartData.update();
                $('.flatpickr-calendar').removeClass('open');
            }
        }
    });
}

function formatDateDifference(date1, date2) {
    debugger;
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const dateDifference = Math.abs(Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const weeks = Math.floor(dateDifference / 7);
    const remainingDays = dateDifference % 7;
    if (dateDifference % 7 == 0) {
        const number_OfWeeks = dateDifference / 7;
        return `${number_OfWeeks} week${number_OfWeeks !== 1 ? 's' : ''}`;
    }
    if (dateDifference % 30 == 0) {
        const number_OfMonth = dateDifference / 30;
        return `${number_OfMonth} month${number_OfMonth !== 1 ? 's' : ''}`;
    }
    if (dateDifference % 360 == 0) {
        const number_OfYear = dateDifference / 360;
        return `${number_OfYear} year${number_OfYear !== 1 ? 's' : ''}`;
    }
    else {
        return `${dateDifference} days`;
    }
}
function updateClearIcon() {
    var clearIcon = document.querySelector('.clearable__clear');
    clearIcon.style.display = selectedDates.length > 0 ? 'inline-block' : 'none';
}

function clearDatesFromCalendar() {
    debugger;
    startDate = "";
    endDate = "";
    from_date = "";
    to_date = "";
    const $inp = $(this).find("input:text"),
        $cle = $(this).find(".clearable__clear");
    $inp.on("input", function () {
        $cle.toggle(!!this.value);
    });
    $cle.on("touchstart click", function (e) {
        debugger;
        e.preventDefault();
        $inp.val("").trigger("input");

    });
    $('#clearable__clear').css('display', 'none');
    $('#calendar-icon').css('display', 'block');
    showpricebydate(from_date, to_date);
    $('#show_records').text('Select Dates');
    $('#category-price-details').css('display', 'none');
    $('#data_not_found').css('display', 'none');
    $('#filteredDataChart').css('display', 'none');
    $('#myPieChart').css('display', 'block');
    $('#show_total_amount').css('display', 'block');
    $('#show_total_filtered_amount').css('display', 'none');
    selectedDates = [];
    document.getElementById('datePicker')._flatpickr.clear();
    var highlightedDates = document.querySelectorAll('.highlighted');
    highlightedDates.forEach(function (date) {
        date.classList.remove('highlighted');
    });
    var customButton = document.getElementById('show_records');
    customButton.disabled = true;
    updateClearIcon();
    startDate = "";
    endDate = "";
}