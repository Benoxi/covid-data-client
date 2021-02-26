<script>
	import VueCharts from 'vue-chartjs';
	import { Line, mixins } from 'vue-chartjs';
	import { Vue, Component, Prop } from 'vue-property-decorator';

	export default
	{
		extends: Line,
		props: [ 'chartData'],
		mixins: [mixins.reactiveProp],
		mounted() {
			this.renderChart(this.chartData);
		}
	}
</script>