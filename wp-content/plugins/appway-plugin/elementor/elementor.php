<?php

namespace APPWAYPLUGIN\Element;


class Elementor {
	static $widgets = array(
		'theme_slider',
		'feature',
		'feature_two',
		'feature_three',
		'video',
		'pricing',
		'testimonial',
		'download',
		'blog',
		'subscribe',
		'theme_slider2',
		'clients',
		'inside_software',
		'feature4',
		'testimonial2',
		'pricing2',
		'theme_slider3',
		'service',
		'feature5',
		'feature5_1',
		'feature5_2',
		'feature5_3',
		'management',
		'testimonial3',
		'make_difference',
		'theme_slider4',
		'service2',
		'feature6',
		'feature6_1',
		'testimonial4',
		'pricing3',
		'theme_slider5',
		'service3',
		'download2',
		'application_setup',
		'clients2',
		'optimization_application',
		'testimonial5',
		'theme_slider6',
		'service4',
		'project_inquiry',
		'service5',
		'video2',
		'testimonial6',
		'subscribe2',
		'theme_slider7',
		'feature7',
		'enterprise',
		'device_friendly',
		'theme_slider8',
		'service6',
		'feature8',
		'customer_management',
		'testimonial7',
		'clients3',
		'theme_slider9',
		'service7',
		'support',
		'funfacts',
		'testimonial8',
		'theme_slider10',
		'clients4',
		'service8',
		'solve_problem',
		'funfacts2',
		'marketing_benefits',
		'testimonial9',
		'subscribe3',
		'theme_slider11',
		'service9',
		'security_invisible',
		'feature9',
		'feature9_1',
		'feature9_2',
		'feature9_3',
		'software_product',
		'testimonial10',
		'betterlook',
		'theme_slider12',
		'clients5',
		'service10',
		'solution',
		'tab',
		'designe_process',
		'streamline3',
		'streamline',
		'theme_slider13',
		'award',
		'chooseus',
		'feature10_sec_title',
		'feature10_1',
		'feature10_2',
		'crm_programming',
		'pricing4',
		'testimonial11',
		'theme_slider14',
		'clients6',
		'service11',
		'feature11_sec_title',
		'feature11_1',
		'feature11_2',
		'calltoaction',
		'powerful_management',
		'subscribe4',
		'theme_slider15',
		'service12',
		'feature12',
		'feature12_1',
		'case_studies',
		'funfacts3',
		'testimonial12',
		'pricing5',
		'check_website',
		'calltoaction2',
		'theme_slider16',
		'transactions_work',
		'service13',
		'timeline_work',
		'take_control',
		'team',
		'blog2',
		'subscribe5',
		'theme_slider17',
		'rider',
		'whereyou',
		'ridesharing',
		'blog3',
		'download_apps',
		'theme_slider18',
		'domain',
		'service14',
		'increase_website',
		'domain_prices',
		'service15',
		'managed_wordpress',
		'testimonial13',
		'subscribe6',
		'theme_slider19',
		'service16',
		'popular_causes',
		'weworks',
		'social_fundraising',
		'campaing',
		'donate',
		'events',
		'blog4',
		'clients7',
		'team2',
		'team3',
		'team4',
		'service17',
		'subscribe7',
		'wi_menu',
		'service_details',
		'service_details2',
		'service_details3',
		'faq_block',
		'portfolios',
		'our_history',
		'funfacts4',
		'faq_sidebar',
		'faq_block2',
		'contact_form',
		'streamline2',
		'managed_wordpress2',
		'feature13',
		'feature14',
		'contact',
		'portfolio_details',
		'portfolio_details1',
		'feature16',
		'feature17',
		'feature18',
		'feature19',
		'rider2',
		'rider3',
		'ridesharing2',
		'footer',
		'footer1',
		'footer2',
		'footer3',
		'footer4',
		'clients8',
		'portfolios2',
		'theme_slider20',
		'clients9',
		'service18',
		'solution2',
		'designe',
		'designe2',
		'streamline4',
		'theme_slider21',
		'domain2',
		'service19',
		'website',
		'domain_prices2',
		'service20',
		'calltoaction4',
		'feature20',
		'testimonial14',
		'subscribe8',
		'page_title',
		'contact2',
		'inside_software_left',
		'inside_software_right',
		'optimization_application_left',
		'optimization_application_right',
		'make_difference_title',
		'make_difference_left',
		'make_difference_right',
		'download2_left',
		'download2_right',
		'subscribe7_left',
		'subscribe7_right',
		'testimonial3_left',
		'testimonial3_right',
		'subscribe_left',
		'subscribe_right',
		'feature6_text_left',
		'feature6_img_right',
		'feature6_img_left',
		'feature6_text_right',
		'subscribe2_left',
		'subscribe2_right',
		'solve_problem_left',
		'solve_problem_right',
		'funfacts2_left',
		'funfacts2_right',
		'marketing_benefits_left',
		'marketing_benefits_right',
		'streamline3_left',
		'streamline3_right',
		'feature11_text_left',
		'feature11_img_right',
		'feature11_img_left',
		'feature11_text_right',
		'powerful_management_title',
		'powerful_management_left',
		'powerful_management_right',
		'transactions_work_left',
		'transactions_work_right',
		'footer_text',
		'footer_menu',
		'footer_address',
		'footer_copy',
		'footer1_text',
		'footer1_menu',
		'footer1_address',
		'footer1_copy',
		'footer3_text',
		'footer3_menu',
		'footer3_address',
		'footer3_copy',
		'footer4_text',
		'footer4_menu',
		'footer4_address',
		'footer4_copy',
		'inside_software_left',
		'inside_software_right',
		'optimization_application_left',
		'optimization_application_right',
		'make_difference_title',
		'feature_left',
		'feature_right',
		'feature_three_left',
		'feature_three_right',
		'feature_three_left2',
		'feature_three_right2',
		'subscribe_left',
		'subscribe_right',
		'feature4_left',
		'feature4_right',
		'feature4_left2',
		'feature4_right2',
		'download2_left',
		'download2_right',
		'optimization_application_left2',
		'optimization_application_right2',
		'feature7_left',
		'feature7_right',
		'feature7_left2',
		'feature7_right2',
		'device_friendly_left',
		'device_friendly_right',
		'service7_left',
		'service7_right',
		'support_title',
		'support_left',
		'support_right',
		'support_left2',
		'support_right2',
		'security_invisible_left',
		'security_invisible_right',
		'feature9_title',
		'feature9_left',
		'feature9_right',
		'software_product_left',
		'software_product_right',
		'testimonial10_left',
		'testimonial10_right',
		'feature10_left',
		'feature10_right',
		'chooseus2',
		'feature12_left',
		'feature12_right',
		'rider_title',
		'rider_left',
		'rider_right',
		'whereyou_title',
		'whereyou_left',
		'whereyou_right',
		'testimonial7_left',
		'testimonial7_right',
		'download_apps_left',
		'download_apps_right',
		'popular_causes_left',
		'popular_causes_right',
		'weworks_left',
		'weworks_right',
		'social_fundraising_left',
		'social_fundraising_right',
		'events_left',
		'events_right',
		'increase_website_left',
		'increase_website_right',
		'solution_img_left',
		'solution_img_right',
		'solution_text_left',
		'solution_text_right',
		
	);

	static function init() {
		add_action( 'elementor/init', array( __CLASS__, 'loader' ) );
		add_action( 'elementor/elements/categories_registered', array( __CLASS__, 'register_cats' ) );
	}

	static function loader() {

		foreach ( self::$widgets as $widget ) {

			$file = APPWAYPLUGIN_PLUGIN_PATH . '/elementor/' . $widget . '.php';
			if ( file_exists( $file ) ) {
				require_once $file;
			}

			add_action( 'elementor/widgets/widgets_registered', array( __CLASS__, 'register' ) );
		}
	}

	static function register( $elemntor ) {
		foreach ( self::$widgets as $widget ) {
			$class = '\\APPWAYPLUGIN\\Element\\' . ucwords( $widget );

			if ( class_exists( $class ) ) {
				$elemntor->register_widget_type( new $class );
			}
		}
	}

	static function register_cats( $elements_manager ) {

		$elements_manager->add_category(
			'appway',
			[
				'title' => esc_html__( 'Appway', 'appway' ),
				'icon'  => 'fa fa-plug',
			]
		);
		$elements_manager->add_category(
			'templatepath',
			[
				'title' => esc_html__( 'Template Path', 'appway' ),
				'icon'  => 'fa fa-plug',
			]
		);

	}
}

Elementor::init();