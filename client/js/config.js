function config($stateProvider, $urlRouterProvider) {
	// Add CSS for main app (index/login/register) here
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('landing', {
			url:'/landing',
			templateUrl: '/landing.html'
		})
		.state('login', {
			url:'/login',
			templateUrl: '/login.html',
			controller: 'LoginCtrl as userLogin'
		})
		.state('register', {
			url:'/register',
			templateUrl: '/register.html',
			controller: 'RegisterCtrl as userRegister'
		})
		.state('index', {
			abstract: true,
			url: '/index',
			templateUrl: 'components/common/content.html',
			authenticate: true
		})
		.state('index.todo', {
			url: '/todo',
			templateUrl: 'components/todo/todo.html',
			authenticate: true
		})
		.state('index.home', {
			url: '',
			templateUrl: 'components/home/home.html',
			data: { pageTitle: 'Home' },
			authenticate: true
		})
		.state('index.calendar', {
			url: '/calendar',
			templateUrl: 'components/calendar/calendar.html',
			controller: 'CalendarCtrl as calendar',
			data: { pageTitle: 'Calendar' },
			authenticate: true
		})
		.state('index.chat', {
			url: '/chat',
			templateUrl: 'components/chat/chat.html',
			controller: 'ChatCtrl as chat',
			data: { pageTitle: 'Chat' },
			authenticate: true
		})
		.state('index.contactlist', {
			url: '/contactlist',
			templateUrl: 'components/contactList/contactList.html',
			controller: "ContactController as contactCtrl",
			data: { pageTitle: 'Contact List' },
			authenticate: true
		})
		.state('index.documents', {
			url: '/documents',
			templateUrl: 'components/documents/documents.html',
			data: { pageTitle: 'Documents' },
			authenticate: true
		})
		.state('index.texteditor', {
			url: '/texteditor',
			templateUrl: 'components/texteditor/texteditor.html',
			data: { pageTitle: 'Text Editor' },
			controller: "TextEditorCtrl as TextEditorCtrl",
			params: { documentId: null, documentTitle: null, documentBody: null },
			authenticate: true
		})
		.state('settings', {
			abstract: true,
			url: '/settings',
			templateUrl: 'components/common/content.html'
		})
		.state('settings.account', {
			url: '/account',
			controller: 'SettingsCtrl as settings',
			templateUrl: 'components/settings/settings.html',
			data: { pageTitle: 'Settings'},
			authenticate: true
		})
		.state('settings.teamedit', {
			url: '/team',
			templateUrl: 'components/teamEdit/teamEdit.html',
			controller: 'TeamController',
			data: { pageTitle: 'Edit Your Teams' },
			authenticate: true
		})
}
angular
	.module('equip')
	// constant variables are available throughout app
  .constant('refUrl', 'https://mksequip.firebaseIO.com')
	.config(config)
	.run(function($rootScope, $state, $location, User) {
		$rootScope.$state = $state;
 		$rootScope.$on('$stateChangeStart', function (evt, next, current) {
   		if (next && next.authenticate && !User.isAuth()) {
 				evt.preventDefault();
 				$rootScope.$evalAsync(function() {
 				  $location.path('/landing');
 				});
   		}
 		});
	});
