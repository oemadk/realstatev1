<?php


class ControllerExtensionFeedGoogleSitemap extends Controller {


	public function index() {


		if ($this->config->get('google_sitemap_status')) {


			$output  = '<?xml version="1.0" encoding="UTF-8"?>';


			$output .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';





			$this->load->model('catalog/product');


					$this->load->model('property/property');


			$this->load->model('tool/image');


			$propertys = $this->model_property_property->getPropertys(array());





			foreach ($propertys as $product) {


				if ($product['image']) {


					$output .= '<url>';


					$output .= '<loc>' . $this->url->link('property/property', 'property_id=' . $product['property_id']) . '</loc>';


					$output .= '<changefreq>weekly</changefreq>';


					$output .= '<lastmod>' . date('Y-m-d\TH:i:sP', strtotime($product['date_modified'])) . '</lastmod>';


					$output .= '<priority>1.0</priority>';


					$output .= '<image:image>';


					$output .= '<image:loc>' . $this->model_tool_image->resize($product['image'], $this->config->get($this->config->get('config_theme') . '_image_popup_width'), $this->config->get($this->config->get('config_theme') . '_image_popup_height')) . '</image:loc>';


					$output .= '<image:caption>' . $product['name'] . '</image:caption>';


					$output .= '<image:title>' . $product['name'] . '</image:title>';


					$output .= '</image:image>';


					$output .= '</url>';


				}


			}








			$this->load->model('catalog/information');





			$informations = $this->model_catalog_information->getInformations();


			foreach ($informations as $information) {


				$output .= '<url>';


				$output .= '<loc>' . $this->url->link('information/information', 'information_id=' . $information['information_id']) . '</loc>';


				$output .= '<changefreq>weekly</changefreq>';


				$output .= '<priority>0.5</priority>';


				$output .= '</url>';


			}





			$output .= '</urlset>';





			$this->response->addHeader('Content-Type: application/xml');


			$this->response->setOutput($output);


		}


	}


	protected function getCategories($parent_id, $current_path = '') {


		$output = '';


		$results = $this->model_property_category->getCategories($parent_id);





		foreach ($results as $result) {


			if (!$current_path) {


				$new_path = $result['category_id'];


			} else {


				$new_path = $current_path . '_' . $result['category_id'];


			}


			$output .= '<url>';


			$output .= '<loc>' . $this->url->link('property/category', 'path=' . $new_path) . '</loc>';


			$output .= '<changefreq>weekly</changefreq>';


			$output .= '<priority>0.7</priority>';


			$output .= '</url>';





			$products = $this->model_property_product->getPropertys(array('filter_category_id' => $result['category_id']));


			foreach ($products as $product) {


				$output .= '<url>';


				$output .= '<loc>' . $this->url->link('property/property', 'path=' . $new_path . '&property_id=' . $product['property_id']) . '</loc>';


				$output .= '<changefreq>weekly</changefreq>';


				$output .= '<priority>1.0</priority>';


				$output .= '</url>';


			}





			$output .= $this->getCategories($result['category_id'], $new_path);


		}





		return $output;


	}


}


