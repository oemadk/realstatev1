<?php echo $header; ?>
<div class="breadmain">
	<div class="container">
		<ul class="breadcrumb">
			<?php foreach ($breadcrumbs as $breadcrumb) { ?>
			<li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
			<?php } ?>
		</ul>
		<h3><?php echo $heading_title; ?></h3>
	</div>
</div>
<div class="container">
  <?php if ($error_warning) { ?>
  <div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?></div>
  <?php } ?>
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?>"><?php echo $content_top; ?>
		<div class="row agentview">
				<div class="image col-sm-3">
					<a href="#"><img class="img-responsive" src="<?php echo $agentimage; ?>" alt="agent" title="agent" class="img-responsive" /></a>
				</div>
				<div class="agentdetail col-sm-9">
					<div class="name"><?php echo $agentname;?></div>
					<div class="name"><?php echo $email;?></div>
					<div class="name"><?php echo $positions;?></div>
					<div class="name"><?php echo $contact;?></div>
					<div class="name"><?php echo $address;?></div>
					<div class="name"><?php echo $country;?></div>
					<div class="name"><?php echo $city;?></div>
					<div class="name"><?php echo $pincode;?></div>
					<div class="name"><?php echo $description;?></div>
					
				</div>
			</div>
		</div>
        </div>
      <?php echo $content_bottom; ?></div>
    <?php echo $column_right; ?></div>
</div>
<?php echo $footer; ?>
