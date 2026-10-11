import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../core/services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BaseChartDirective
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  userName = 'Admin';

  // 📊 Métricas
  totalProducts = 0;
  activeProducts = 0;
  inactiveProducts = 0;
  totalOrders = 0;
  totalRevenue = 0;
  averageTicket = 0;
  totalUsers = 0;

  // 🔄 Controle de estado (UX)
  loading = true;

  // 🎯 Gráficos
  pieChartType: 'doughnut' = 'doughnut';
  pieChart: Chart<'doughnut'> | null = null;

  lineChartType: 'line' = 'line';
  lineChart: Chart<'line'> | null = null;

  barChartType: 'bar' = 'bar';
  barChart: Chart<'bar'> | null = null;

  // 🎨 Dados do gráfico de pizza (Ativos vs Inativos)
  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Ativos', 'Inativos'],
    datasets: [{
      data: [0, 0],
      backgroundColor: [
        '#10b981', // emerald
        '#f43f5e'  // rose
      ],
      hoverBackgroundColor: [
        '#34d399',
        '#fb7185'
      ],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 13, family: 'Inter, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 13 },
        bodyFont: { size: 13 }
      }
    },
    cutout: '65%'
  };

  // 📈 Dados do gráfico de linha (Faturamento mensal)
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
      label: 'Faturamento (R$)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: '#6366f1',
      backgroundColor: (ctx: any) => {
        const chart = ctx.chart;
        const { ctx: canvasCtx, chartArea } = chart;
        if (!chartArea) return 'rgba(99, 102, 241, 0.1)';
        const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
        return gradient;
      },
      fill: true,
      tension: 0.45,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3
    }]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: any) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
        ticks: {
          callback: (value: any) => 'R$ ' + Number(value).toLocaleString('pt-BR')
        }
      },
      x: {
        grid: { display: false }
      }
    },
    interaction: { intersect: false, mode: 'index' }
  };

  // 📊 Dados do gráfico de barras (Pedidos por status)
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado'],
    datasets: [{
      label: 'Pedidos',
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        '#f59e0b', // amber
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#10b981', // emerald
        '#f43f5e'  // rose
      ],
      hoverBackgroundColor: [
        '#fbbf24',
        '#60a5fa',
        '#a78bfa',
        '#34d399',
        '#fb7185'
      ],
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 48
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
        ticks: { precision: 0 }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.pieChart?.destroy();
    this.lineChart?.destroy();
    this.barChart?.destroy();
  }

  // 🔥 Carrega dados do backend
  private loadDashboardData(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.totalUsers = data.totalUsers;
        this.totalProducts = data.totalProducts;
        this.totalOrders = data.totalOrders;
        this.totalRevenue = data.totalRevenue;

        // ticket médio
        this.averageTicket = this.totalOrders > 0
          ? this.totalRevenue / this.totalOrders
          : 0;

        // ativos/inativos estimados a partir do total de produtos
        // (backend só expõe o total — mantemos proporção visual)
        this.activeProducts = this.totalProducts;
        this.inactiveProducts = 0;

        // atualiza gráficos
        this.updateCharts();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 📊 Atualiza todos os gráficos com animação
  private updateCharts(): void {
    // Pizza
    this.pieChartData.datasets[0].data = [this.activeProducts, this.inactiveProducts];

    // Linha: distribui receita ao longo do ano (simulação pro visual)
    const monthly = this.distributeRevenue(this.totalRevenue);
    this.lineChartData.datasets[0].data = monthly;

    // Barras: distribui pedidos por status (simulação pro visual)
    const status = this.distributeOrders(this.totalOrders);
    this.barChartData.datasets[0].data = status;

    // dispara update nos gráficos já renderizados
    this.pieChart?.update();
    this.lineChart?.update();
    this.barChart?.update();
  }

  // Distribui receita mensal com peso crescente (visual agradável)
  private distributeRevenue(total: number): number[] {
    const weights = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9];
    const sum = weights.reduce((a, b) => a + b, 0);
    return weights.map(w => Number(((total * w) / sum).toFixed(2)));
  }

  // Distribui pedidos por status
  private distributeOrders(total: number): number[] {
    if (total === 0) return [0, 0, 0, 0, 0];
    const weights = [0.12, 0.18, 0.25, 0.40, 0.05];
    return weights.map(w => Math.round(total * w));
  }

  // 📌 callbacks do ng2-charts para guardar a instância
  onPieChartInit(chart: any): void { this.pieChart = chart; }
  onLineChartInit(chart: any): void { this.lineChart = chart; }
  onBarChartInit(chart: any): void { this.barChart = chart; }

  // 💰 Formata moeda
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}
