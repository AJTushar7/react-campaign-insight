import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="app-header">
        <div class="container">
          <h1>Campaign Manager Dashboard</h1>
          <p>Multi-channel campaign analytics and management platform</p>
        </div>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 0;
      margin-bottom: 2rem;
    }
    
    .app-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2.5rem;
      font-weight: 700;
    }
    
    .app-header p {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }
    
    .app-main {
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent {
  title = 'Campaign Manager Dashboard';
}